import { SpecularButton } from "@shared/ui/molecules";
import styles from "./Hero.module.scss";
import UseAnimations from 'react-useanimations';
import scrollDown from 'react-useanimations/lib/scrollDown';
import { HeroVideo } from './ui/HeroVideo';

export type HeroProps = {
  videoSrc?: string;
  videoSrcMobile?: string;
  poster?: string;
  mobilePoster?: string;
};

export const Hero = ({
  videoSrc,
  videoSrcMobile,
  poster,
  mobilePoster,
}: HeroProps) => {
  const hasVideo = Boolean(videoSrc || videoSrcMobile);

  return (
    <section
      id="main"
      className={styles.hero}
      data-has-video={hasVideo ? "" : undefined}
    >
      {hasVideo && videoSrc && poster && (
        <HeroVideo
          desktopSrc={videoSrc}
          mobileSrc={videoSrcMobile}
          poster={poster}
          mobilePoster={mobilePoster}
        />
      )}

      {hasVideo && <div className={styles.scrim} aria-hidden="true" />}

      <div className={styles.heroText}>
        <h1
          className={styles.heroTitle}
        >
          ВидеоПроСпорт
        </h1>
        <h3 className={styles.heroSubtitle}
            style={{
                textTransform: 'uppercase',
            }}
        >
          Профессиональная фото и видеосъемка
          <br />в спорте
        </h3>
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
      </div>
      <UseAnimations className={styles.scrollIcon} animation={scrollDown} size={32} />
    </section>
  );
};
