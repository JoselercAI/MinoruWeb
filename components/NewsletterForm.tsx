"use client";

import Script from "next/script";
import { ATTRIBUTION_COOKIE_NAME, attributionFieldNames, parseAttributionData } from "@/lib/tracking";
import { Button } from "./Button";

type Props = {
  className?: string;
  inputClassName?: string;
  redirect: string;
};

const getCookie = (name: string) => {
  const prefix = `${name}=`;
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(prefix));

  return cookie ? cookie.slice(prefix.length) : null;
};

export function NewsletterForm({ className, inputClassName, redirect }: Props) {
  const analytics = redirect === "/newsletter" ? "newsletter_page_submit" : "home_newsletter_submit";
  const attribution = typeof document === "undefined"
    ? {}
    : parseAttributionData(getCookie(ATTRIBUTION_COOKIE_NAME));
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <>
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}

      <form action="/api/newsletter" className={className} method="post">
        <input type="hidden" name="redirect" value={redirect} />
        {attributionFieldNames.map((name) => (
          <input
            defaultValue={attribution[name] || ""}
            key={name}
            name={name}
            suppressHydrationWarning
            type="hidden"
          />
        ))}
        <input
          autoComplete="off"
          name="company"
          tabIndex={-1}
          type="text"
          style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
        />
        <input
          className={inputClassName}
          name="email"
          placeholder="Tu correo electrónico"
          required
          type="email"
        />
        {turnstileSiteKey ? (
          <div
            className="cf-turnstile"
            data-sitekey={turnstileSiteKey}
            data-theme="dark"
          />
        ) : null}
        <Button analytics={analytics} type="submit">
          Suscribirse
        </Button>
      </form>
    </>
  );
}
