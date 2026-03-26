import Link from "next/link";
import styles from "./button.module.scss";

type Props = {
  children: React.ReactNode;
  href?: string;
  kind?: "primary" | "ghost";
  type?: "button" | "submit";
};

export function Button({
  children,
  href,
  kind = "primary",
  type = "button",
}: Props) {
  const className = `${styles.button} ${styles[kind]}`;

  if (href) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} type={type}>
      {children}
    </button>
  );
}
