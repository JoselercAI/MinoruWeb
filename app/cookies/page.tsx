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
            <h1>Política de cookies.</h1>
            <span>
              Esta web solo activa cookies no esenciales cuando el usuario da su consentimiento
              explícito.
            </span>
          </div>

          <div className={styles.stack}>
            <article className="card">
              <h2>Esenciales</h2>
              <p>
                Son necesarias para recordar tus preferencias de cookies y para que la web
                funcione correctamente.
              </p>
            </article>

            <article className="card">
              <h2>Analítica</h2>
              <p>
                Si las aceptas, usamos herramientas de medición para entender desde dónde llega el
                tráfico, qué páginas se visitan y qué acciones convierten mejor.
              </p>
            </article>

            <article className="card">
              <h2>Marketing</h2>
              <p>
                Si las aceptas, podemos activar píxeles publicitarios para medir campañas y crear
                audiencias. Nunca se activan por defecto.
              </p>
            </article>

            <article className="card">
              <h2>Gestión del consentimiento</h2>
              <p>
                Puedes aceptar, rechazar o cambiar tus preferencias en cualquier momento desde el
                botón flotante de cookies que aparece en la web.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
