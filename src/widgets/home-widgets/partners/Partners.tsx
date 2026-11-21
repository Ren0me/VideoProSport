
import styles from "./Partners.module.scss";
import { PartnersList } from "./ui/partners-list";

export const Partners = () => {
  return (
    <section id="partners" className={styles.partners}>
      <div className={styles.content}>
        <h2 className={styles.partnersTitle}>Наши партнеры</h2>
      </div>
      <PartnersList />
    </section>
  );
};
