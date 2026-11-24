'use client';

import { useEffect, useRef, useState } from 'react';

import { useInView } from '@shared/lib';

import type { ServiceMedia } from '../lib/use-get-services-gallery';
import styles from './service-media.module.scss';

type ServiceMediaViewProps = {
  media: ServiceMedia;
  active: boolean;
  reducedMotion: boolean;
};

export const ServiceMediaView = ({
  media,
  active,
  reducedMotion,
}: ServiceMediaViewProps) => {
  const rootRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const inView = useInView(rootRef, {
    rootMargin: '300px 0px',
    once: false,
  });

  useEffect(() => {
    if (!active || !inView || reducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => setFailedSrc(media.src));

    return () => video.pause();
  }, [active, inView, media.src, reducedMotion]);

  if (media.type === 'video') {
    const shouldPlay =
      active && inView && !reducedMotion && failedSrc !== media.src;

    return (
      <span ref={rootRef} className={styles.root}>
        {shouldPlay ? (
          <video
            ref={videoRef}
            src={media.src}
            poster={media.poster}
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            onError={() => setFailedSrc(media.src)}
            tabIndex={-1}
          />
        ) : media.poster ? (
          // Media may come from an external admin/CDN URL, so next/image is not applicable here.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.poster}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ) : null}
      </span>
    );
  }

  return (
    <span ref={rootRef} className={styles.root}>
      {/* Media may come from an external admin/CDN URL, so next/image is not applicable here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media.src}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </span>
  );
};
