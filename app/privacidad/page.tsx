import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getLegalSections } from "@/lib/legal";
import { site } from "@/lib/site";
import styles from "../legal.module.scss";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Política de privacidad de ${site.name}.`,
};

export default async function PrivacyPage() {
  const sections = await getLegalSections("privacy_policy.md");

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className="container">
          <div className={styles.hero}>
            <p>Legal</p>
            <h1>Política de privacidad.</h1>
            <span>
              Texto legal completo sobre privacidad, tratamiento de datos y cookies aplicado a
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
