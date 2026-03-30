import Link from "next/link";
import styles from "./button.module.scss";

type Props = {
  analytics?: string;
  children: React.ReactNode;
  href?: string;
  kind?: "primary" | "ghost";
  type?: "button" | "submit";
};

export function Button({
  analytics,
  children,
  href,
  kind = "primary",
  type = "button",
}: Props) {
  const className = `${styles.button} ${styles[kind]}`;

  if (href) {
    return (
      <Link className={className} data-analytics={analytics} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} data-analytics={analytics} type={type}>
      {children}
    </button>
  );
}
