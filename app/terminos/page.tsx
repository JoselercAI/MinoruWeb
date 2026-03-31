import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: `Términos y condiciones de ${site.name}.`,
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className="container">
          <div className={styles.hero}>
            <p>Legal</p>
            <h1>Términos y condiciones.</h1>
            <span>
              Documento informativo en actualización. Para cualquier consulta sobre el uso de la
              web o sus condiciones, escribe a {site.email}.
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
