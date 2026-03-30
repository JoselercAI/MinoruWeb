"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ATTRIBUTION_COOKIE_NAME,
  COOKIE_CONSENT_NAME,
  attributionFieldNames,
  parseAttributionData,
  parseCookieConsent,
  serializeAttributionData,
  type AttributionData,
  type CookieConsent,
} from "@/lib/tracking";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

const getCookie = (name: string) => {
  const prefix = `${name}=`;
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(prefix));

  return cookie ? cookie.slice(prefix.length) : null;
};

const setCookie = (name: string, value: string, days = 180) => {
  const maxAge = days * 24 * 60 * 60;
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; samesite=lax${secure}`;
};

const isExternalReferrer = (value: string) => {
  if (!value) {
    return false;
  }

  try {
    return new URL(value).hostname !== window.location.hostname;
  } catch {
    return false;
  }
};

const getConsent = (): CookieConsent | null =>
  parseCookieConsent(getCookie(COOKIE_CONSENT_NAME));

const mergeAttribution = (
  pathname: string,
  query: URLSearchParams,
  existing: AttributionData,
): AttributionData => {
  const next: AttributionData = { ...existing };
  const landing = `${pathname}${query.toString() ? `?${query.toString()}` : ""}`;

  next.landing_page = next.landing_page || landing;

  if (!next.referrer && isExternalReferrer(document.referrer)) {
    next.referrer = document.referrer;
  }

  attributionFieldNames
    .filter((field) => field.startsWith("utm_"))
    .forEach((field) => {
      const current = query.get(field);

      if (!next[field] && current) {
        next[field] = current;
      }
    });

  return next;
};

export function TrackingManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const search = searchParams.toString();

  useEffect(() => {
    const sync = () => setConsent(getConsent());

    sync();
    window.addEventListener("cookie-consent-updated", sync);

    return () => window.removeEventListener("cookie-consent-updated", sync);
  }, []);

  useEffect(() => {
    if (!consent?.analytics) {
      return;
    }

    const current = parseAttributionData(getCookie(ATTRIBUTION_COOKIE_NAME));
    const merged = mergeAttribution(pathname, new URLSearchParams(search), current);

    setCookie(ATTRIBUTION_COOKIE_NAME, serializeAttributionData(merged), 90);
  }, [consent?.analytics, pathname, search]);

  useEffect(() => {
    if (!consent || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
  }, [consent]);

  useEffect(() => {
    if (!gaId || !consent?.analytics || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", "page_view", {
      page_path: `${pathname}${search ? `?${search}` : ""}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [consent?.analytics, pathname, search]);

  useEffect(() => {
    if (!fbPixelId || !consent?.marketing || typeof window.fbq !== "function") {
      return;
    }

    window.fbq("track", "PageView");
  }, [consent?.marketing, pathname, search]);

  useEffect(() => {
    if (!consent?.analytics) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const element = target?.closest<HTMLElement>("[data-analytics]");
      const label = element?.dataset.analytics;

      if (!label || typeof window.gtag !== "function") {
        return;
      }

      const href =
        element instanceof HTMLAnchorElement || element instanceof HTMLButtonElement
          ? element.getAttribute("href") || ""
          : "";

      window.gtag("event", "select_content", {
        content_type: "cta",
        item_id: label,
        link_url: href,
      });
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [consent?.analytics]);

  return (
    <>
      {gaId ? (
        <Script id="ga-consent-default" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            window.gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });
          `}
        </Script>
      ) : null}

      {gaId && consent?.analytics ? (
        <>
          <Script
            id="ga-script"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              window.gtag('js', new Date());
              window.gtag('config', '${gaId}', {
                anonymize_ip: true,
                send_page_view: false
              });
            `}
          </Script>
        </>
      ) : null}

      {fbPixelId && consent?.marketing ? (
        <>
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${fbPixelId}');
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
