'use client';

import dynamic from 'next/dynamic';
import type { PrismCarouselProps } from '@shared/ui';
import styles from './portfolio-preview.module.scss';

const PrismCarousel = dynamic(
  () =>
    import('@shared/ui/organisms/PrismCarousel').then(
      (module) => module.PrismCarousel
    ),
  {
    ssr: false,
    loading: () => <div className={styles.carousel} aria-hidden="true" />,
  }
);

export const PortfolioCarousel = (props: PrismCarouselProps) => (
  <PrismCarousel {...props} />
);
