"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_NAME,
  COOKIE_PREFERENCES_VERSION,
  parseCookieConsent,
  serializeCookieConsent,
  type CookieConsent,
} from "@/lib/tracking";
import styles from "./cookie-consent.module.scss";

const getCookie = (name: string) => {
  if (typeof document === "undefined") {
    return null;
  }

  const prefix = `${name}=`;
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(prefix));

  return cookie ? cookie.slice(prefix.length) : null;
};

const setCookie = (name: string, value: string, days = 180) => {
  const maxAge = days * 24 * 60 * 60;
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; samesite=lax${secure}`;
};

const emitConsent = (consent: CookieConsent) => {
  window.dispatchEvent(
    new CustomEvent("cookie-consent-updated", {
      detail: consent,
    }),
  );
};

export function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const current = parseCookieConsent(getCookie(COOKIE_CONSENT_NAME));

      if (current) {
        setAnalytics(current.analytics);
        setHasConsent(true);
        setOpen(false);
      } else {
        setHasConsent(false);
        setOpen(true);
      }

      setReady(true);
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  if (!ready) {
    return null;
  }

  const save = (nextAnalytics: boolean) => {
    const consent = {
      version: COOKIE_PREFERENCES_VERSION,
      analytics: nextAnalytics,
      marketing: false,
      updatedAt: new Date().toISOString(),
    };

    setCookie(COOKIE_CONSENT_NAME, serializeCookieConsent(consent));
    setAnalytics(nextAnalytics);
    setHasConsent(true);
    setCustomize(false);
    setOpen(false);
    emitConsent(consent);
  };

  return (
    <>
      {!hasConsent ? (
        <button className={styles.manage} onClick={() => setOpen(true)} type="button">
          Cookies
        </button>
      ) : null}

      {open ? (
        <div className={styles.wrap}>
          <section className={styles.banner}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>Cookies</p>
              <h2>Usamos cookies. Las justas.</h2>
              <p>
                Las esenciales para que la web funcione, y si nos das permiso, algunas de
                analitica para entender que funciona y que no. Nada mas. Puedes cambiar esto cuando
                quieras.{" "}
                <Link href="/cookies" onClick={() => setOpen(false)}>
                  Más información
                </Link>
              </p>
            </div>

            {customize ? (
              <div className={styles.preferences}>
                <label className={styles.option}>
                  <div>
                    <strong>Esenciales</strong>
                    <span>Necesarias para el funcionamiento básico de la web.</span>
                  </div>
                  <input checked disabled type="checkbox" />
                </label>

                <label className={styles.option}>
                  <div>
                    <strong>Analítica</strong>
                    <span>Para entender qué funciona y qué no, nada más.</span>
                  </div>
                  <input
                    checked={analytics}
                    onChange={(event) => setAnalytics(event.target.checked)}
                    type="checkbox"
                  />
                </label>

                <div className={styles.actions}>
                  <button onClick={() => save(false)} type="button">
                    Rechazar
                  </button>
                  <button onClick={() => save(analytics)} type="button">
                    Guardar preferencias
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.actions}>
                <button onClick={() => save(false)} type="button">
                  Rechazar
                </button>
                <button onClick={() => setCustomize(true)} type="button">
                  Configurar
                </button>
                <button className={styles.primary} onClick={() => save(true)} type="button">
                  Aceptar
                </button>
              </div>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}
