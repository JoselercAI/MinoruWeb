import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { contactBlocks, site } from "@/lib/site";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacto y enlaces principales de ${site.name}.`,
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className="container">
          <div className={styles.hero}>
            <div>
              <p>Contacto</p>
              <h1>Hablemos.</h1>
              <span>
                Una vía directa para colaboraciones, propuestas estratégicas y conversaciones con
                sentido.
              </span>
            </div>
            <div className={`${styles.visual} card`}>
              <Image
                alt="Minoru Isisola en una reunión"
                fill
                priority
                sizes="(max-width: 920px) 100vw, 45vw"
                src="/images/contact.jpg"
              />
            </div>
          </div>
          <div className={styles.grid}>
            {contactBlocks.map((item) => (
              <article className="card" key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
                <Button href={item.href} kind="ghost">
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
