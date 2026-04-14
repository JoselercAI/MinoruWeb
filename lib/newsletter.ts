import { attributionFieldLabels, attributionFieldNames, type AttributionData } from "./tracking";

const acquisitionLabelField = "MW Acquisition Label";

const newsletterState = {
  error: "No hemos podido procesar tu suscripción.",
  missing: "Falta configurar Beehiiv para activar el formulario real.",
};

export function getNewsletterMessage(value?: string | null) {
  if (!value) {
    return null;
  }

  return newsletterState[value as keyof typeof newsletterState] || newsletterState.error;
}

export function getBeehiivPublicationId() {
  const id = process.env.BEEHIIV_PUBLICATION_ID?.trim();

  if (!id) {
    return null;
  }

  return id.startsWith("pub_") ? id : `pub_${id}`;
}

export function getNewsletterRedirectPath(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  return value;
}

export function getNewsletterSuccessUrl() {
  return "/newsletter/confirmado";
}

const buildAcquisitionLabel = (attribution: AttributionData) => {
  const parts = [attribution.utm_source, attribution.utm_campaign, attribution.utm_term].filter(Boolean);
  return parts.length ? parts.join(" | ") : "";
};

const sanitizeTag = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

export function getAttributionFromFormData(data: FormData): AttributionData {
  return attributionFieldNames.reduce<AttributionData>((acc, field) => {
    const value = data.get(field);

    if (typeof value === "string" && value.trim()) {
      acc[field] = value.trim();
    }

    return acc;
  }, {});
}

type BeehiivCustomFieldResponse = {
  data?: Array<{
    display?: string;
  }>;
};

type BeehiivCustomFieldPayload = {
  name: string;
  value: string;
};

const getBeehiivHeaders = (apiKey: string) => ({
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
});

export function getBeehiivSubscriptionPayload(attribution: AttributionData) {
  return {
    ...(attribution.utm_source ? { utm_source: attribution.utm_source } : {}),
    ...(attribution.utm_medium ? { utm_medium: attribution.utm_medium } : {}),
    ...(attribution.utm_campaign ? { utm_campaign: attribution.utm_campaign } : {}),
    ...(attribution.utm_term ? { utm_term: attribution.utm_term } : {}),
    ...(attribution.utm_content ? { utm_content: attribution.utm_content } : {}),
    ...(attribution.referrer ? { referring_site: attribution.referrer } : {}),
  };
}

export function getBeehiivSubscriptionTags(attribution: AttributionData) {
  if (attribution.utm_source === "youtube" && attribution.utm_campaign) {
    return [`yt_${sanitizeTag(attribution.utm_campaign)}`];
  }

  if (attribution.utm_campaign) {
    return [`camp_${sanitizeTag(attribution.utm_campaign)}`];
  }

  return [];
}

export async function addBeehiivSubscriptionTags(
  apiKey: string,
  publicationId: string,
  subscriptionId: string,
  attribution: AttributionData,
) {
  const tags = getBeehiivSubscriptionTags(attribution);

  if (!tags.length) {
    return;
  }

  await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${subscriptionId}/tags`,
    {
      method: "POST",
      headers: getBeehiivHeaders(apiKey),
      body: JSON.stringify({ tags }),
    },
  );
}

export async function getBeehiivCustomFieldPayload(
  apiKey: string,
  publicationId: string,
  attribution: AttributionData,
) {
  const entries: BeehiivCustomFieldPayload[] = Object.entries(attribution)
    .filter((entry): entry is [keyof AttributionData, string] => Boolean(entry[1]))
    .map(([key, value]) => ({
      name: attributionFieldLabels[key],
      value,
    }));
  const acquisitionLabel = buildAcquisitionLabel(attribution);

  if (acquisitionLabel) {
    entries.push({
      name: acquisitionLabelField,
      value: acquisitionLabel,
    });
  }

  if (!entries.length) {
    return [];
  }

  const url = `https://api.beehiiv.com/v2/publications/${publicationId}/custom_fields`;
  const existing = new Set<string>();

  try {
    const listResponse = await fetch(url, {
      headers: getBeehiivHeaders(apiKey),
      cache: "no-store",
    });

    if (listResponse.ok) {
      const payload = (await listResponse.json()) as BeehiivCustomFieldResponse;
      payload.data?.forEach((item) => {
        if (item.display) {
          existing.add(item.display);
        }
      });
    }

    for (const entry of entries) {
      const display = entry.name;

      if (existing.has(display)) {
        continue;
      }

      const createResponse = await fetch(url, {
        method: "POST",
        headers: getBeehiivHeaders(apiKey),
        body: JSON.stringify({
          display,
          kind: "string",
        }),
      });

      if (createResponse.ok) {
        existing.add(display);
      }
    }
  } catch {
    return [];
  }

  return entries
    .filter((entry) => existing.has(entry.name))
    .map((entry) => ({
      name: entry.name,
      value: entry.value,
    }));
}
