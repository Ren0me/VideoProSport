import { AboutCards } from "./ui/about-cards";
import styles from "./About.module.scss";
import { CornerLink } from "@/src/shared/ui";

export const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.content}>
        <h2 className={styles.aboutTitle}>О компании</h2>

        <div className={styles.aboutBody}>
          <article className={styles.aboutLead}>
            <p className={styles.aboutSubtitle}>
              <span className={styles.aboutSubtitleCutText}>Медиа Арт</span> — международная компания с многолетним опытом
              и <span className={styles.aboutSubtitleCutText}>множеством положительных отзывов</span>, организующая прямые
              трансляции и профессиональную фото- и видеосъёмку турниров
              по художественной гимнастике и другим видам спорта. Мы уже
              <span className={styles.aboutSubtitleCutText}> успешно</span> работали в ряде европейских стран, обеспечивая
              клиентам <span className={styles.aboutSubtitleCutText}>качественный контент и надёжный сервис</span> на любом
              уровне соревнований.
            </p>
          </article>

          <AboutCards />
        </div>
        <CornerLink label="О компании" route="contacts"/>
      </div>
    </section>
  );
};
