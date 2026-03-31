import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: `Información sobre cookies y consentimiento en ${site.name}.`,
};

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className="container">
          <div className={styles.hero}>
            <p>Cookies</p>
            <h1>Usamos cookies. Las justas.</h1>
            <span>
              Las esenciales para que la web funcione, y si nos das permiso, algunas de analítica
              para entender qué funciona y qué no. Nada más.
            </span>
          </div>

          <div className={styles.stack}>
            <article className="card">
              <h2>Esenciales</h2>
              <p>
                Las necesarias para que la web funcione y para recordar tu preferencia de cookies.
              </p>
            </article>

            <article className="card">
              <h2>Analítica</h2>
              <p>
                Si la aceptas, sirve para entender qué funciona y qué no dentro de la web.
              </p>
            </article>

            <article className="card">
              <h2>Control</h2>
              <p>
                El consentimiento se guarda en tu navegador. Si borras las cookies o cambias de
                dispositivo, volveremos a pedirte tu elección.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
