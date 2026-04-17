import { NextResponse } from "next/server";
import { recordBadgerEvent } from "@/lib/badger";
import {
  addBeehiivSubscriptionTags,
  getAttributionFromFormData,
  getBeehiivPublicationId,
  getBeehiivCustomFieldPayload,
  getBeehiivSubscriptionPayload,
  getNewsletterRedirectPath,
  getNewsletterSuccessUrl,
} from "@/lib/newsletter";

const rateWindowMs = 10 * 60 * 1000;
const maxAttemptsPerWindow = 8;
const attempts = new Map<string, number[]>();

const redirectToPage = (request: Request, state: string, pathname: string) => {
  const url = new URL(pathname, request.url);

  if (state) {
    url.searchParams.set("newsletter", state);
  }

  if (pathname === "/") {
    url.hash = "newsletter";
  }

  return NextResponse.redirect(url, { status: 303 });
};

const getClientKey = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = request.headers.get("user-agent") || "unknown";
  return `${forwarded || "unknown"}:${userAgent}`;
};

const isRateLimited = (request: Request) => {
  const now = Date.now();
  const key = getClientKey(request);
  const recent = (attempts.get(key) || []).filter((value) => now - value < rateWindowMs);

  recent.push(now);
  attempts.set(key, recent);

  return recent.length > maxAttemptsPerWindow ? recent.length : 0;
};

const getRequestMeta = (request: Request) => {
  const url = new URL(request.url);
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const headers = Object.fromEntries(
    ["accept", "accept-language", "referer", "origin", "user-agent", "x-forwarded-for"]
      .map((name) => [name, request.headers.get(name) || ""])
      .filter((entry) => entry[1]),
  );

  return {
    ip: forwarded,
    userAgent: request.headers.get("user-agent") || "unknown",
    referer: request.headers.get("referer") || "",
    origin: request.headers.get("origin") || "",
    path: `${url.pathname}${url.search}`,
    headers,
  };
};

const verifyTurnstile = async (request: Request, token: string) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return true;
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip) {
    body.set("remoteip", ip);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    return false;
  }

  const payload = (await response.json()) as { success?: boolean };
  return payload.success === true;
};

export async function POST(request: Request) {
  const data = await request.formData();
  const email = data.get("email");
  const honeypot = data.get("company");
  const turnstileToken = data.get("cf-turnstile-response");
  const redirectPath = getNewsletterRedirectPath(data.get("redirect"));
  const publicationId = getBeehiivPublicationId();
  const apiKey = process.env.BEEHIIV_API_KEY;
  const attribution = getAttributionFromFormData(data);
  const meta = getRequestMeta(request);

  if (typeof honeypot === "string" && honeypot.trim()) {
    await recordBadgerEvent({
      type: "honeypot",
      attribution,
      email: typeof email === "string" ? email : undefined,
      headers: meta.headers,
      honeypotValue: honeypot,
      ip: meta.ip,
      origin: meta.origin,
      path: meta.path,
      redirectPath,
      referer: meta.referer,
      turnstile: {
        enabled: Boolean(process.env.TURNSTILE_SECRET_KEY),
        tokenPresent: typeof turnstileToken === "string" && turnstileToken.length > 0,
      },
      userAgent: meta.userAgent,
    });
    return redirectToPage(request, "blocked", redirectPath);
  }

  const attemptCount = isRateLimited(request);

  if (attemptCount) {
    await recordBadgerEvent({
      type: "rate_limited",
      attribution,
      email: typeof email === "string" ? email : undefined,
      headers: meta.headers,
      ip: meta.ip,
      origin: meta.origin,
      path: meta.path,
      rateLimit: {
        attempts: attemptCount,
        windowMs: rateWindowMs,
      },
      redirectPath,
      referer: meta.referer,
      turnstile: {
        enabled: Boolean(process.env.TURNSTILE_SECRET_KEY),
        tokenPresent: typeof turnstileToken === "string" && turnstileToken.length > 0,
      },
      userAgent: meta.userAgent,
    });
    return redirectToPage(request, "rate_limited", redirectPath);
  }

  if (process.env.TURNSTILE_SECRET_KEY) {
    if (typeof turnstileToken !== "string" || !(await verifyTurnstile(request, turnstileToken))) {
      await recordBadgerEvent({
        type: "turnstile_failed",
        attribution,
        email: typeof email === "string" ? email : undefined,
        headers: meta.headers,
        ip: meta.ip,
        origin: meta.origin,
        path: meta.path,
        redirectPath,
        referer: meta.referer,
        turnstile: {
          enabled: true,
          tokenPresent: typeof turnstileToken === "string" && turnstileToken.length > 0,
        },
        userAgent: meta.userAgent,
      });
      return redirectToPage(request, "blocked", redirectPath);
    }
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return redirectToPage(request, "error", redirectPath);
  }

  if (!apiKey || !publicationId) {
    return redirectToPage(request, "missing", redirectPath);
  }

  try {
    const customFields = await getBeehiivCustomFieldPayload(apiKey, publicationId, attribution);
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          ...getBeehiivSubscriptionPayload(attribution),
          ...(customFields.length ? { custom_fields: customFields } : {}),
        }),
      },
    );

    const payload = response.ok ? ((await response.json()) as { data?: { id?: string } }) : null;

    if (response.ok && payload?.data?.id) {
      await addBeehiivSubscriptionTags(apiKey, publicationId, payload.data.id, attribution);
    }

    return redirectToPage(
      request,
      response.ok ? "" : "error",
      response.ok ? getNewsletterSuccessUrl() : redirectPath,
    );
  } catch {
    return redirectToPage(request, "error", redirectPath);
  }
}
