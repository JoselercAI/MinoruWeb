import Link from "next/link";
import { navItems, site } from "@/lib/site";
import { Button } from "./Button";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.wrap}>
      <div className={`container ${styles.inner}`}>
        <Link className={styles.brand} data-analytics="header_brand" href="/">
          {site.name}
        </Link>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <a data-analytics={`nav_${item.label.toLowerCase()}`} href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <Button analytics="header_contact" href="/contacto" kind="ghost">
          Contacto
        </Button>
      </div>
    </header>
  );
}
