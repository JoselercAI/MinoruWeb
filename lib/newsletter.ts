const newsletterState = {
  success: "Te has suscrito correctamente.",
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
