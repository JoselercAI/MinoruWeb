import Image from "next/image";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";
import { about, site, timeline } from "@/lib/site";
import { getYoutubeVideos } from "@/lib/youtube";
import styles from "./page.module.scss";

type Props = {
  searchParams?: Promise<{ newsletter?: string }>;
};

const newsletterState = {
  success: "Te has suscrito correctamente.",
  error: "No hemos podido procesar tu suscripción.",
  missing: "Falta configurar Beehiiv para activar el formulario real.",
};

export default async function Home({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const videos = await getYoutubeVideos();
  const message = params.newsletter
    ? newsletterState[params.newsletter as keyof typeof newsletterState]
    : null;

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>Arquitecto de futuros digitales</p>
              <h1>
                Minoru
                <br />
                Isisola
              </h1>
              <p className={styles.lead}>
                Negocio, sistemas e inteligencia artificial. Una nueva etapa para construir,
                documentar y compartir lo que de verdad funciona.
              </p>
              <div className={styles.actions}>
                <Button href="#newsletter">Newsletter</Button>
                <Button href="/contacto" kind="ghost">
                  Página de contacto
                </Button>
              </div>
            </div>
            <div className={`${styles.visual} card`}>
              <Image
                alt="Minoru Isisola en un entorno de trabajo"
                fill
                priority
                sizes="(max-width: 920px) 100vw, 50vw"
                src="/images/hero.jpg"
              />
            </div>
          </div>
        </section>

        <Section id="sobre-mi" title="Sobre mí">
          <div className={styles.aboutGrid}>
            <div className={`${styles.portrait} card`}>
              <Image
                alt="Minoru Isisola trabajando con portátil"
                fill
                sizes="(max-width: 920px) 100vw, 40vw"
                src="/images/about.jpg"
              />
            </div>
            <div className={styles.stack}>
              {about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Section>

        <Section id="trayectoria" title="Trayectoria">
          <div className={styles.timeline}>
            <div className={styles.stack}>
              {timeline.map((item) => (
                <article className={styles.timelineItem} key={item.year}>
                  <strong>{item.year}</strong>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className={`${styles.sideVisual} card`}>
              <Image
                alt="Minoru Isisola durante una entrevista"
                fill
                sizes="(max-width: 920px) 100vw, 40vw"
                src="/images/timeline.jpg"
              />
            </div>
          </div>
        </Section>

        <Section
          id="youtube"
          eyebrow="Educación e insights"
          title="Canal de YouTube"
          muted
        >
          <div className={styles.youtubeTop}>
            <p>
              Contenido para seguir el proceso, entender decisiones y ver cómo evoluciona el
              proyecto en tiempo real.
            </p>
            <Button href={site.youtubeUrl} kind="ghost">
              Ver canal
            </Button>
          </div>
          <div className={styles.videoGrid}>
            {videos.map((video) => (
              <a
                className={`${styles.videoCard} card`}
                href={video.url}
                key={video.id}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  alt={video.title}
                  height={360}
                  src={video.thumbnail}
                  width={640}
                />
                <div className={styles.videoBody}>
                  <span>{video.publishedAt}</span>
                  <h3>{video.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </Section>

        <Section id="newsletter" title="Cada semana en tu email">
          <div className={`${styles.newsletter} card`}>
            <div className={styles.newsletterCopy}>
              <p>
                Sin ruido. Lo que estoy construyendo, lo que estoy probando y lo que merece la
                pena entender antes que el resto.
              </p>
              {message ? <div className={styles.notice}>{message}</div> : null}
            </div>
            <form action="/api/newsletter" className={styles.form} method="post">
              <input name="email" placeholder="Tu correo electrónico" required type="email" />
              <Button type="submit">Suscribirse</Button>
            </form>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
