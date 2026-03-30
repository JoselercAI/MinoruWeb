import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Confirma Tu Email",
  description: `Confirma tu suscripción a la newsletter de ${site.name}.`,
};

const providers = [
  {
    href: "https://mail.google.com/mail/u/0/#inbox",
    label: "Abrir Gmail",
    note: "Si usas Gmail, entra y busca el email de confirmación.",
  },
  {
    href: "https://outlook.live.com/mail/0/",
    label: "Abrir Outlook",
    note: "Si usas Outlook, revisa también promociones y correo no deseado.",
  },
];

type Props = {
  searchParams?: Promise<{ estado?: string }>;
};

export default async function NewsletterConfirmationPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const active = params.estado === "activa";

  return (
    <>
      <main className={styles.page}>
        <section className="container">
          <div className={styles.hero}>
            <p>{active ? "Suscripción completada" : "Suscripción iniciada"}</p>
            <h1>{active ? "Ya estás dentro." : "Confirma tu email."}</h1>
            <span>
              {active
                ? "Tu email ya ha quedado correctamente dado de alta en la lista."
                : "Te hemos enviado un correo para validar tu suscripción. Hasta que no pulses el enlace de confirmación, no quedarás dentro de la lista."}
            </span>
          </div>

          <div className={`${styles.card} card`}>
            <div className={styles.copy}>
              <h2>{active ? "Todo correcto." : "Solo queda un paso."}</h2>
              <p>
                {active ? (
                  <>Si quieres asegurarte de recibir bien los próximos correos, añade <strong>{site.email}</strong> a tus contactos.</>
                ) : (
                  <>
                    Busca el email de confirmación en tu bandeja principal, spam o promociones. Si
                    no lo ves en unos minutos, añade <strong>{site.email}</strong> a tus contactos y
                    vuelve a revisar.
                  </>
                )}
              </p>
            </div>

            <div className={styles.grid}>
              {providers.map((provider) => (
                <a
                  className={styles.provider}
                  data-analytics={`newsletter_confirm_${provider.label.toLowerCase().replace(" ", "_")}`}
                  href={provider.href}
                  key={provider.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <strong>{provider.label}</strong>
                  <span>{provider.note}</span>
                </a>
              ))}
            </div>

            <div className={styles.notice}>
              <p>
                {active
                  ? "Si te has registrado con otro proveedor, no pasa nada. La suscripción ya está activa."
                  : "Si te has registrado con otro proveedor, no pasa nada: el proceso es el mismo. Simplemente abre tu correo y confirma el enlace que te acabamos de enviar."}
              </p>
              <a data-analytics="newsletter_confirm_contact" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
