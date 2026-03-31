import { site } from "@/lib/site";
import styles from "./footer.module.scss";

const links = [
  { label: "YouTube", href: site.youtubeUrl },
  { label: "Instagram", href: site.instagramUrl },
];

const legalLinks = [
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Términos y condiciones", href: "/terminos" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.meta}>
          <p>© 2026 {site.name}. Todos los derechos reservados.</p>
          <div className={styles.legal}>
            {legalLinks.map((link) => (
              <a data-analytics={`footer_${link.label.toLowerCase()}`} href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.links}>
          {links.map((link) => (
            <a
              data-analytics={`footer_${link.label.toLowerCase()}`}
              href={link.href}
              key={link.label}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
