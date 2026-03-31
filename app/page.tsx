import Image from "next/image";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Section } from "@/components/Section";
import { getNewsletterMessage } from "@/lib/newsletter";
import { about, site, timeline } from "@/lib/site";
import { getYoutubeVideos } from "@/lib/youtube";
import styles from "./page.module.scss";

type Props = {
  searchParams?: Promise<{ newsletter?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const videos = await getYoutubeVideos();
  const message = getNewsletterMessage(params.newsletter);

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>Emprendedor · Inversor</p>
              <h1>
                Minoru
                <br />
                Isisola
              </h1>
              <p className={styles.lead}>
                Construyo negocios con IA y lo documento todo en publico.
              </p>
              <div className={styles.actions}>
                <Button analytics="hero_newsletter" href="/newsletter">
                  Recibir el email semanal
                </Button>
              </div>
              <p className={styles.proof}>12.000 emprendedores ya lo reciben</p>
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
          eyebrow="IA · Negocios"
          title="Canal de YouTube"
          muted
        >
          <div className={styles.youtubeTop}>
            <p>
              Si buscas a alguien que pruebe herramientas de IA y cuente la verdad sobre lo que
              funciona, este es el canal.
            </p>
            <div className={styles.youtubeDesktopCta}>
              <Button analytics="youtube_channel" href={site.youtubeUrl} kind="ghost">
                Ver el canal
              </Button>
            </div>
          </div>
          <div className={styles.videoGrid}>
            {videos.map((video) => (
              <a
                className={`${styles.videoCard} card`}
                href={video.url}
                key={video.id}
                data-analytics={`youtube_video_${video.id}`}
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
          <div className={styles.youtubeMobileCta}>
            <Button analytics="youtube_channel_mobile" href={site.youtubeUrl} kind="ghost">
              Ver el canal
            </Button>
          </div>
        </Section>

        <Section
          id="newsletter"
          title="Lo que aprendo cada semana, directo a tu email"
          headingClassName={styles.newsletterHeading}
        >
          <div className={`${styles.newsletter} card`}>
            <div className={styles.newsletterCopy}>
              <p>
                El 90% del contenido de IA en espanol es ruido.
              </p>
              <p>
                Cada semana te cuento que estoy construyendo, que herramientas estoy probando y
                que merece la pena saber antes que el resto.
              </p>
              {message ? <div className={styles.notice}>{message}</div> : null}
            </div>
            <NewsletterForm className={styles.form} inputClassName={styles.input} redirect="/" />
            <p className={styles.newsletterProof}>12.000 emprendedores ya lo reciben.</p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
