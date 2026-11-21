'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import UseAnimations from 'react-useanimations';
import arrowUp from 'react-useanimations/lib/arrowUp';
import { cn } from 'cn';
import styles from './scroll-up-btn.module.scss';

const SCROLL_THRESHOLD = 300;

export const ScrollUpButton = () => {
  const t = useTranslations('ScrollUpButton');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type='button'
      className={cn(styles.scrollUpButton, isVisible && styles.isVisible)}
      aria-label={t('label')}
      onClick={scrollToTop}
    >
      <UseAnimations animation={arrowUp} size={32} />
    </button>
  );
};
