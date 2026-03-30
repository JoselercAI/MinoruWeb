export const COOKIE_CONSENT_NAME = "minoru_cookie_consent";
export const ATTRIBUTION_COOKIE_NAME = "minoru_attribution";
export const COOKIE_PREFERENCES_VERSION = "2026-03";

export type CookieConsent = {
  version: string;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export type AttributionData = {
  landing_page?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

export const attributionFieldLabels: Record<keyof AttributionData, string> = {
  landing_page: "MW Landing Page",
  referrer: "MW Referrer",
  utm_source: "MW UTM Source",
  utm_medium: "MW UTM Medium",
  utm_campaign: "MW UTM Campaign",
  utm_content: "MW UTM Content",
  utm_term: "MW UTM Term",
};

export const attributionFieldNames = Object.keys(
  attributionFieldLabels,
) as (keyof AttributionData)[];

export function parseCookieConsent(value?: string | null): CookieConsent | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<CookieConsent>;

    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") {
      return null;
    }

    return {
      version: parsed.version || COOKIE_PREFERENCES_VERSION,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function serializeCookieConsent(value: CookieConsent) {
  return encodeURIComponent(JSON.stringify(value));
}

export function parseAttributionData(value?: string | null): AttributionData {
  if (!value) {
    return {};
  }

  try {
    return JSON.parse(decodeURIComponent(value)) as AttributionData;
  } catch {
    return {};
  }
}

export function serializeAttributionData(value: AttributionData) {
  return encodeURIComponent(JSON.stringify(value));
}
