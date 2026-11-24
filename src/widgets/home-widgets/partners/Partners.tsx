
import styles from "./Partners.module.scss";
import { PartnersList } from "./ui/partners-list";
import { LazyMount } from "@shared/ui";

export const Partners = () => {
  return (
    <section id="partners" className={styles.partners}>
      <div className={styles.content}>
        <h2 className={styles.partnersTitle}>Наши партнеры</h2>
      </div>
      <LazyMount minHeight={148} rootMargin="500px 0px">
        <PartnersList />
      </LazyMount>
    </section>
  );
};
