import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { contactBlocks, site } from "@/lib/site";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacto, colaboraciones y canales principales de ${site.name}.`,
};

export default function ContactoPage() {
  const emailBlock = contactBlocks[0];
  const channels = contactBlocks.slice(1);

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className="container">
          <div className={styles.hero}>
            <p>Contacto</p>
            <h1>Hablemos.</h1>
            <span>
              Si tienes una propuesta concreta, adelante. Si no sabes muy bien que escribir,
              empieza por el canal que mas encaje.
            </span>
          </div>
          <div className={styles.grid}>
            <article className={`${styles.emailCard} card`}>
              <h2>{emailBlock.title}</h2>
              <p>{emailBlock.body}</p>
              <ContactForm />
            </article>
            {channels.map((item) => (
              <article className={`${styles.channelCard} card`} key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
                <Button analytics={`contact_${item.title.toLowerCase()}`} href={item.href} kind="ghost">
                  {item.cta}
                </Button>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
