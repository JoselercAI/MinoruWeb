import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Política de privacidad de ${site.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className="container">
          <div className={styles.hero}>
            <p>Legal</p>
            <h1>Política de privacidad.</h1>
            <span>
              Documento informativo en actualización. Para cualquier consulta sobre privacidad o
              tratamiento de datos, escribe a {site.email}.
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
