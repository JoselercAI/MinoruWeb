"use client";

import type { FormEvent } from "react";
import { site } from "@/lib/site";
import { Button } from "./Button";
import styles from "./contact-form.module.scss";

export function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Asunto: ${subject}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" required type="text" />
      <input name="email" placeholder="Email" required type="email" />
      <input name="subject" placeholder="Asunto" required type="text" />
      <textarea name="message" placeholder="Mensaje" required rows={6} />
      <Button analytics="contact_form_submit" type="submit">
        Enviar mensaje
      </Button>
    </form>
  );
}
