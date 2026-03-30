"use client";

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

  return (
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
        className={inputClassName}
        name="email"
        placeholder="Tu correo electrónico"
        required
        type="email"
      />
      <Button analytics={analytics} type="submit">
        Suscribirse
      </Button>
    </form>
  );
}
