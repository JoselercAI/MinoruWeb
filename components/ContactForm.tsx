"use client";

import type { FormEvent } from "react";
import { site } from "@/lib/site";
import { Button } from "./Button";
import styles from "./contact-form.module.scss";

const reasons = ["Colaboración", "Patrocinio", "Prensa", "Otro"];

export function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const reason = String(data.get("reason") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = `Contacto web - ${reason}`;
    const body = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Motivo: ${reason}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" required type="text" />
      <input name="email" placeholder="Email" required type="email" />
      <select defaultValue="" name="reason" required>
        <option disabled value="">
          Motivo
        </option>
        {reasons.map((reason) => (
          <option key={reason} value={reason}>
            {reason}
          </option>
        ))}
      </select>
      <textarea name="message" placeholder="Mensaje" required rows={6} />
      <Button analytics="contact_form_submit" type="submit">
        Enviar mensaje
      </Button>
    </form>
  );
}
