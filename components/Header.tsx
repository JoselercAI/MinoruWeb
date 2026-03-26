import Link from "next/link";
import { navItems, site } from "@/lib/site";
import { Button } from "./Button";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.wrap}>
      <div className={`container ${styles.inner}`}>
        <Link className={styles.brand} href="/">
          {site.name}
        </Link>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <Button href="/contacto" kind="ghost">
          Contacto
        </Button>
      </div>
    </header>
  );
}
