import styles from "./section.module.scss";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  muted?: boolean;
  headingClassName?: string;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, muted, headingClassName, children }: Props) {
  return (
    <section className={muted ? `${styles.section} ${styles.muted}` : styles.section} id={id}>
      <div className="container">
        <div className={headingClassName ? `${styles.heading} ${headingClassName}` : styles.heading}>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
