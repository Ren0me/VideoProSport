import { useGetAboutList } from "../lib/use-get-about-list";
import styles from "./about-cards.module.scss";

export const AboutCards = () => {
  const items = useGetAboutList();

  return (
    <ul className={styles.cardsGrid}>
      {items.map(({ icon: Icon, subtitle, title }, index) => (
        <li key={title} className={styles.card}>
          <span className={styles.cardIcon} aria-hidden="true">
            {/* <UseAnimations
              animation={ANIMATIONS[index] ?? camera}
              interaction="hover"
              size={32}
            /> */}
            <Icon size={20} strokeWidth={1.7} />
          </span>

          <div className={styles.cardText}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardSubtitle}>{subtitle}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
