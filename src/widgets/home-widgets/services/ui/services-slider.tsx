'use client';

import { useCallback, useRef, type CSSProperties } from 'react';
import { A11y, Autoplay, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';

import 'swiper/css';
import 'swiper/css/a11y';

import { usePrefersReducedMotion } from '../lib/use-prefers-reduced-motion';
import type { ServiceGalleryItem } from '../lib/use-get-services-gallery';
import { FALLBACK_SERVICE_ICON, SERVICE_ICONS } from './service-icons';
import { ServiceMediaView } from './service-media';
import styles from './services-slider.module.scss';

export interface ServicesSliderProps {
  items: ServiceGalleryItem[];
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  radius?: number;
  gap?: number;
  interval?: number;
  className?: string;
}

const SLIDER_SPEED = 600;

export const ServicesSlider = ({
  items,
  accentColor = '#ffffff',
  overlayColor = '#060010',
  textColor = '#ffffff',
  radius = 16,
  gap = 10,
  interval = 5000,
  className = '',
}: ServicesSliderProps) => {
  const ringRefs = useRef<(SVGCircleElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  const handleAutoplayTimeLeft = useCallback(
    (swiper: SwiperClass, _timeLeft: number, percentage: number) => {
      // During transitions and pauses Swiper keeps emitting the previous
      // percentage. Skip those frames so the next slide's ring starts empty.
      if (swiper.autoplay?.paused) return;

      const ring = ringRefs.current[swiper.realIndex];
      if (!ring) return;

      const timeLeft = Math.min(1, Math.max(0, percentage));
      ring.style.strokeDashoffset = `${timeLeft * 100}`;
    },
    []
  );

  const rootStyle = {
    '--slider-accent': accentColor,
    '--slider-overlay': overlayColor,
    '--slider-text': textColor,
    '--slider-radius': `${radius}px`,
  } as CSSProperties;

  return (
    <Swiper
      className={`${styles.slider}${className ? ` ${className}` : ''}`}
      style={rootStyle}
      modules={[Autoplay, A11y, Keyboard]}
      slidesPerView={1}
      spaceBetween={gap}
      speed={reducedMotion ? 0 : SLIDER_SPEED}
      loop
      autoplay={
        reducedMotion
          ? false
          : {
              delay: Math.max(1500, interval),
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
      }
      a11y={{
        containerMessage: 'Галерея услуг',
        containerRoleDescriptionMessage: 'карусель',
        itemRoleDescriptionMessage: 'слайд',
        slideLabelMessage: '{{index}} из {{slidesLength}}',
      }}
      keyboard={{ enabled: true, onlyInViewport: true }}
      onAutoplayTimeLeft={handleAutoplayTimeLeft}
    >
      {items.map(({ media, text, label, icon }, index) => {
        const Icon = SERVICE_ICONS[icon] ?? FALLBACK_SERVICE_ICON;

        return (
          <SwiperSlide
            key={`${label}-${index}`}
            tag="article"
            className={styles.slide}
          >
            {({ isActive }) => (
              <>
                <span className={styles.media} aria-hidden="true">
                  <ServiceMediaView
                    media={media}
                    active={isActive}
                    reducedMotion={reducedMotion}
                  />
                </span>
                <span className={styles.overlay} aria-hidden="true" />

                <span className={styles.iconBadge} aria-hidden="true">
                  <svg
                    className={styles.ring}
                    viewBox="0 0 46 46"
                    aria-hidden="true"
                  >
                    <circle
                      className={styles.ringTrack}
                      cx="23"
                      cy="23"
                      r="21"
                      pathLength={100}
                    />
                    {isActive && !reducedMotion && (
                      <circle
                        ref={(element) => {
                          ringRefs.current[index] = element;
                        }}
                        className={styles.ringValue}
                        cx="23"
                        cy="23"
                        r="21"
                        pathLength={100}
                        strokeDasharray={100}
                        strokeDashoffset={100}
                      />
                    )}
                  </svg>
                  <Icon size={20} strokeWidth={1.7} />
                </span>

                <div className={styles.content}>
                  <div className={styles.titleRow}>
                    <span className={styles.bar} aria-hidden="true" />
                    <h3 className={styles.title}>{label}</h3>
                  </div>
                  <p className={styles.description}>{text}</p>
                </div>
              </>
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
