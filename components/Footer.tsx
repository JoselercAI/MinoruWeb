import { site } from "@/lib/site";
import styles from "./footer.module.scss";

const links = [
  { label: "YouTube", href: site.youtubeUrl },
  { label: "Instagram", href: site.instagramUrl },
  { label: "TikTok", href: site.tiktokUrl },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>© {new Date().getFullYear()} {site.name}. Todos los derechos reservados.</p>
        <div className={styles.links}>
          {links.map((link) => (
            <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
