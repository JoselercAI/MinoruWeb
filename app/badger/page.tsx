import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { getBadgerDashboard } from "@/lib/badger";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Badger",
  description: "Panel interno de detecciones del honeypot y filtros anti-bot.",
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export default async function BadgerPage() {
  const dashboard = await getBadgerDashboard();

  return (
    <>
      <main className={styles.page}>
        <section className="container">
          <div className={styles.hero}>
            <p>Herramienta interna</p>
            <h1>Badger</h1>
            <span>
              Detecciones del honeypot, validación de Turnstile y rate limiting del formulario de
              newsletter.
            </span>
          </div>

          {!dashboard.enabled ? (
            <div className={`${styles.notice} card`}>
              <h2>Falta almacenamiento persistente.</h2>
              <p>
                Para ver eventos reales en producción necesitas configurar `BLOB_READ_WRITE_TOKEN`
                en Vercel.
              </p>
            </div>
          ) : null}

          <div className={styles.metrics}>
            <article className={`${styles.metric} card`}>
              <strong>{dashboard.summary.total}</strong>
              <span>Total detectados</span>
            </article>
            <article className={`${styles.metric} card`}>
              <strong>{dashboard.summary.honeypot}</strong>
              <span>Honeypot</span>
            </article>
            <article className={`${styles.metric} card`}>
              <strong>{dashboard.summary.turnstile_failed}</strong>
              <span>Turnstile fallido</span>
            </article>
            <article className={`${styles.metric} card`}>
              <strong>{dashboard.summary.rate_limited}</strong>
              <span>Rate limited</span>
            </article>
          </div>

          <div className={styles.list}>
            {dashboard.events.length ? (
              dashboard.events.map((event) => (
                <article className={`${styles.event} card`} key={event.id}>
                  <div className={styles.eventTop}>
                    <div>
                      <p>{event.type}</p>
                      <h2>{event.email || "Sin email"}</h2>
                    </div>
                    <span>{formatDate(event.detectedAt)}</span>
                  </div>

                  <div className={styles.grid}>
                    <div className={styles.block}>
                      <strong>Contexto</strong>
                      <p>IP: {event.ip}</p>
                      <p>User-Agent: {event.userAgent}</p>
                      <p>Path: {event.path}</p>
                      <p>Redirect: {event.redirectPath}</p>
                      <p>Origin: {event.origin || "n/a"}</p>
                      <p>Referer: {event.referer || "n/a"}</p>
                    </div>

                    <div className={styles.block}>
                      <strong>Protecciones</strong>
                      <p>Turnstile activo: {event.turnstile.enabled ? "sí" : "no"}</p>
                      <p>Token presente: {event.turnstile.tokenPresent ? "sí" : "no"}</p>
                      <p>Honeypot: {event.honeypotValue || "vacío"}</p>
                      <p>
                        Rate limit:{" "}
                        {event.rateLimit
                          ? `${event.rateLimit.attempts} intentos / ${Math.round(event.rateLimit.windowMs / 60000)} min`
                          : "n/a"}
                      </p>
                    </div>

                    <div className={styles.block}>
                      <strong>Atribución</strong>
                      <p>Source: {event.attribution.utm_source || "n/a"}</p>
                      <p>Medium: {event.attribution.utm_medium || "n/a"}</p>
                      <p>Campaign: {event.attribution.utm_campaign || "n/a"}</p>
                      <p>Term: {event.attribution.utm_term || "n/a"}</p>
                      <p>Content: {event.attribution.utm_content || "n/a"}</p>
                      <p>Landing: {event.attribution.landing_page || "n/a"}</p>
                    </div>
                  </div>

                  <details className={styles.details}>
                    <summary>Ver headers</summary>
                    <pre>{JSON.stringify(event.headers, null, 2)}</pre>
                  </details>
                </article>
              ))
            ) : (
              <div className={`${styles.notice} card`}>
                <h2>Sin eventos todavía.</h2>
                <p>Cuando el honeypot o los filtros bloqueen tráfico, aparecerá aquí.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
