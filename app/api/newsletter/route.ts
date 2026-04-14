import { NextResponse } from "next/server";
import {
  addBeehiivSubscriptionTags,
  getAttributionFromFormData,
  getBeehiivPublicationId,
  getBeehiivCustomFieldPayload,
  getBeehiivSubscriptionPayload,
  getNewsletterRedirectPath,
  getNewsletterSuccessUrl,
} from "@/lib/newsletter";

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

export async function POST(request: Request) {
  const data = await request.formData();
  const email = data.get("email");
  const redirectPath = getNewsletterRedirectPath(data.get("redirect"));
  const publicationId = getBeehiivPublicationId();
  const apiKey = process.env.BEEHIIV_API_KEY;
  const attribution = getAttributionFromFormData(data);

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
