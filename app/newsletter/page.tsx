import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { getNewsletterMessage } from "@/lib/newsletter";
import { site } from "@/lib/site";
import styles from "./page.module.scss";

type Props = {
  searchParams?: Promise<{ newsletter?: string }>;
};

export const metadata: Metadata = {
  title: "Newsletter",
  description: `Newsletter oficial de ${site.name}.`,
};

export default async function NewsletterPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const message = getNewsletterMessage(params.newsletter);

  return (
    <>
      <main className={styles.page}>
        <section className="container">
          <div className={styles.hero}>
            <p>Newsletter</p>
            <h1>Cada semana en tu email.</h1>
            <span>
              Ideas, aprendizajes y decisiones reales sobre negocio, sistemas e inteligencia
              artificial. Sin ruido y sin relleno.
            </span>
          </div>
          <div className={`${styles.card} card`}>
            <div className={styles.copy}>
              <h2>Minoru&apos;s Newsletter</h2>
              <p>
                Un correo breve para seguir lo que estoy construyendo y entender lo que merece la
                pena antes que el resto.
              </p>
              <ul className={styles.points}>
                <li>Experimentos reales.</li>
                <li>Sistemas y aprendizajes accionables.</li>
                <li>Actualizaciones directas, sin humo.</li>
              </ul>
            </div>
            <form action="/api/newsletter" className={styles.form} method="post">
              <input type="hidden" name="redirect" value="/newsletter" />
              <input name="email" placeholder="Tu correo electrónico" required type="email" />
              <Button type="submit">Suscribirse</Button>
            </form>
            {message ? <div className={styles.notice}>{message}</div> : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
