import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import { GuideVideo } from "./GuideVideo";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Confirma Tu Email",
  description: `Confirma tu suscripción a la newsletter de ${site.name}.`,
};

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
            <h1>{active ? "Ya estás dentro." : "¡IMPORTANTE!"}</h1>
            <span>
              {active
                ? "Tu email ya ha quedado correctamente dado de alta en la lista."
                : "Te acabo de mandar un email para confirmar que eres tú."}
            </span>
          </div>

          <div className={`${styles.card} card`}>
            <div className={styles.copy}>
              <h2>{active ? "Todo correcto." : "Mira este vídeo"}</h2>
              {!active ? <GuideVideo /> : null}
              <p>
                {active ? (
                  <>
                    Si quieres asegurarte de recibir bien los próximos correos, añade{" "}
                    <strong>{site.email}</strong> a tus contactos.
                  </>
                ) : (
                  <>
                    Busca un mensaje de <strong>{site.email}</strong>. Puede que esté en{" "}
                    <strong>PROMOCIONES</strong> o en <strong>SPAM</strong>.
                  </>
                )}
              </p>
              {!active ? (
                <>
                  <p>Haz clic en el enlace que hay dentro y ya está.</p>
                  <p>Si no confirmas, no recibes nada. Así de simple.</p>
                </>
              ) : null}
            </div>

            {active ? (
              <div className={styles.notice}>
                <p>Si te has registrado con otro proveedor, no pasa nada. La suscripción ya está activa.</p>
                <a data-analytics="newsletter_confirm_contact" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>
            ) : (
              <>
                <div className={styles.placeholder}>
                  <span>Para mover a Principal</span>
                  <Image
                    alt="Guía visual para mover el correo desde promociones a Principal en Gmail"
                    className={styles.guideImage}
                    height={413}
                    src="/images/gmail-move-to-inbox.png"
                    width={1024}
                  />
                </div>

                <div className={styles.grid}>
                  <a
                    className={styles.provider}
                    data-analytics="newsletter_confirm_gmail"
                    href="https://mail.google.com/mail/u/0/#inbox"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <strong>Abrir Gmail</strong>
                  </a>
                </div>

                <p className={styles.note}>Si usas otro proveedor, el proceso es el mismo.</p>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
