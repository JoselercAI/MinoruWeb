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
    label: "Ir a Gmail a confirmarlo",
    note: "Busca el mensaje de hola@minoruisisola.com y confirma desde ahi.",
  },
  {
    href: "https://outlook.live.com/mail/0/",
    label: "Ir a Outlook a confirmarlo",
    note: "Revisa bandeja principal, spam o promociones antes de confirmar.",
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
            <h1>{active ? "Ya estas dentro." : "Casi estas dentro."}</h1>
            <span>
              {active
                ? "Tu email ya ha quedado correctamente dado de alta en la lista."
                : "Te acabo de mandar un email para confirmar que eres tu. Si no confirmas, no recibes nada. Asi de simple."}
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
                    Busca un mensaje de <strong>{site.email}</strong>. Puede que este en spam o en
                    promociones. Haz clic en el enlace que hay dentro y ya esta.
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
                  : "Si usas otro proveedor, el proceso es el mismo."}
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
