import { getTranslations } from "next-intl/server";
import { SpecularButton } from "@shared/ui/molecules";
import styles from "./sale-banner.module.scss";

export const SaleBanner = async () => {
  const t = await getTranslations("SaleBanner");

  return (
    <section id="sale" className={styles.section}>
      <div className={styles.content}>
        <div className={styles.panel}>
          <span className={styles.sweep} aria-hidden="true" />

          <div className={styles.info}>
            <span className={styles.eyebrow}>
              <span className={styles.dot} aria-hidden="true" />
              {t("eyebrow")}
            </span>

            <h2 className={styles.title}>{t("title")}</h2>

            <p className={styles.text}>{t("text")}</p>

            <div className={styles.actions}>
              <SpecularButton
                size="lg"
                radius={18}
                tint="#26232e"
                tintOpacity={0.4}
                blur={20}
                saturate={1.6}
                textColor="#f5f5f5"
                lineColor="#ffc9a3"
                fillColor="#ffceab"
                baseColor="#686868"
                intensity={1}
                idleIntensity={1}
                shineSize={10}
                shineFade={34}
                thickness={0.5}
                glow={1.5}
                followMouse={true}
                autoAnimate={true}
                proximity={250}
              />
              <span className={styles.note}>{t("note")}</span>
            </div>
          </div>

          <div className={styles.badge} aria-hidden="true">
            <span className={styles.ring} />
            <span className={styles.badgeValue}>{t("badgeValue")}</span>
            <span className={styles.badgeLabel}>{t("badgeLabel")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
