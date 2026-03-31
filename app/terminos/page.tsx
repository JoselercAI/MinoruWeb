import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getLegalSections } from "@/lib/legal";
import { site } from "@/lib/site";
import styles from "../legal.module.scss";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: `Términos y condiciones de ${site.name}.`,
};

export default async function TermsPage() {
  const sections = await getLegalSections("terms.md");

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className="container">
          <div className={styles.hero}>
            <p>Legal</p>
            <h1>Términos y condiciones.</h1>
            <span>
              Texto legal completo sobre uso del sitio, contratación y condiciones aplicables a
              {` ${site.domain}`}.
            </span>
          </div>
          <div className={styles.content}>
            {sections.map((section) => (
              <article className={`${styles.section} card`} key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p className={/^[a-z]\)/i.test(paragraph) ? styles.item : undefined} key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
