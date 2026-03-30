import { attributionFieldLabels, attributionFieldNames, type AttributionData } from "./tracking";

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

export function getNewsletterSuccessPath() {
  return "/newsletter/confirmacion";
}

export function getNewsletterSuccessUrl(status?: string) {
  if (status === "active") {
    return "/newsletter/confirmacion?estado=activa";
  }

  return getNewsletterSuccessPath();
}

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

const getBeehiivHeaders = (apiKey: string) => ({
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
});

export async function getBeehiivCustomFieldPayload(
  apiKey: string,
  publicationId: string,
  attribution: AttributionData,
) {
  const entries = Object.entries(attribution).filter(
    (entry): entry is [keyof AttributionData, string] => Boolean(entry[1]),
  );

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

    for (const [key] of entries) {
      const display = attributionFieldLabels[key];

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
    .filter(([key]) => existing.has(attributionFieldLabels[key]))
    .map(([key, value]) => ({
      name: attributionFieldLabels[key],
      value,
    }));
}
