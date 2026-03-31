import { site } from "@/lib/site";
import styles from "./footer.module.scss";

const links = [
  { label: "YouTube", href: site.youtubeUrl },
  { label: "Instagram", href: site.instagramUrl },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>© 2026 {site.name}. Todos los derechos reservados.</p>
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
