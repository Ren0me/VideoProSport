'use client';

import dynamic from 'next/dynamic';

import { useIsMobile } from '../lib/use-is-mobile';
import type { AccordionGalleryServicesProps } from './services-gallery';
import type { ServicesSliderProps } from './services-slider';
import styles from './services-gallery-view.module.scss';

const loading = () => <div className={styles.placeholder} aria-hidden="true" />;

const AccordionGalleryServices = dynamic<AccordionGalleryServicesProps>(
  () => import('./services-gallery'),
  { ssr: false, loading }
);

const ServicesSlider = dynamic<ServicesSliderProps>(
  () => import('./services-slider').then((module) => module.ServicesSlider),
  { ssr: false, loading }
);

export interface ServicesGalleryProps extends AccordionGalleryServicesProps {
  autoplayInterval?: number;
}

export const ServicesGallery = ({
  autoplayInterval = 5000,
  ...props
}: ServicesGalleryProps) => {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return loading();
  }

  if (!isMobile) {
    return <AccordionGalleryServices {...props} />;
  }

  return (
    <ServicesSlider
      items={props.items}
      accentColor={props.accentColor}
      overlayColor={props.overlayColor}
      textColor={props.textColor}
      radius={props.radius}
      gap={props.gap}
      interval={autoplayInterval}
      className={props.className}
    />
  );
};
