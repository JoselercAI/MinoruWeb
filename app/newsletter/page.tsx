import type { Metadata } from "next";
import { BeehiivForm } from "@/components/BeehiivForm";
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
              El 90% del contenido de IA en español es ruido. Esto es lo que queda cuando lo
              eliminas.
            </span>
          </div>
          <div className={`${styles.card} card`}>
            <div className={styles.copy}>
              <h2>El email semanal de Minoru</h2>
              <p>
                Cada semana te cuento que estoy construyendo, que herramientas estoy probando y
                que merece la pena saber antes que el resto.
              </p>
              <ul className={styles.points}>
                <li>Lo que funciona. Lo que no. Con números reales.</li>
                <li>Herramientas probadas con mi propio dinero.</li>
                <li>Solo recomiendo lo que he probado yo mismo.</li>
              </ul>
            </div>
            <BeehiivForm className={styles.form} />
            {message ? <div className={styles.notice}>{message}</div> : null}
            <p className={styles.proof}>+12.000 emprendedores ya lo reciben</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
