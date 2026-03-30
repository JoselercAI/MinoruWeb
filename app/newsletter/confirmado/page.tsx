import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Suscripción Confirmada",
  description: `Suscripción confirmada a la newsletter de ${site.name}.`,
};

export default function NewsletterConfirmedPage() {
  return (
    <>
      <main className={styles.page}>
        <section className="container">
          <div className={styles.hero}>
            <p>Suscripción confirmada</p>
            <h1>Ya estás dentro.</h1>
            <span>
              Tu email ha quedado confirmado correctamente. A partir de ahora formarás parte de la
              newsletter de Minoru.
            </span>
          </div>

          <div className={`${styles.card} card`}>
            <div className={styles.copy}>
              <h2>Todo listo.</h2>
              <p>
                Recibirás próximos correos con ideas, aprendizajes y actualizaciones reales sobre
                negocio, sistemas e inteligencia artificial.
              </p>
            </div>

            <div className={styles.notice}>
              <p>
                Para asegurarte de recibirlo todo bien, añade <strong>{site.email}</strong> a tus
                contactos.
              </p>
            </div>

            <div className={styles.actions}>
              <Button analytics="newsletter_confirmed_home" href="/">
                Ir a la home
              </Button>
              <Button analytics="newsletter_confirmed_youtube" href={site.youtubeUrl} kind="ghost">
                Ver YouTube
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
