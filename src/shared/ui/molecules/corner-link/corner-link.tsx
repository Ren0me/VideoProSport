import { ArrowUpRight } from "lucide-react";
import { Link } from "@shared/i18n";
import styles from "./corner-link.module.scss";

type TCornerLink = {
  label: string;
  route: string;
};

export const CornerLink = ({ label, route }: TCornerLink) => {
  return (
    <div className={styles.wrap}>
      <span
        className={`${styles.corner} ${styles.cornerTopLeft}`}
        aria-hidden="true"
      />
      <span
        className={`${styles.corner} ${styles.cornerTopRight}`}
        aria-hidden="true"
      />
      <span
        className={`${styles.corner} ${styles.cornerBottomLeft}`}
        aria-hidden="true"
      />
      <span
        className={`${styles.corner} ${styles.cornerBottomRight}`}
        aria-hidden="true"
      />

      <Link className={styles.link} href={`/${route}`}>
        <span>{label}</span>
        <ArrowUpRight className={styles.icon} aria-hidden="true" />
      </Link>
    </div>
  );
};
