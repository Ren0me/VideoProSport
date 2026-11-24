'use client';

import { useEffect, useRef, useState } from 'react';

import { useInView, useMediaQuery } from '@shared/lib';

import styles from '../Hero.module.scss';

type HeroVideoProps = {
  desktopSrc: string;
  mobileSrc?: string;
  poster: string;
  mobilePoster?: string;
};

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

const MOBILE_QUERY = '(max-width: 767px)';

const getInitialVideoPermission = () => {
  if (typeof navigator === 'undefined') return false;

  const connection = (
    navigator as Navigator & { connection?: NetworkInformation }
  ).connection;

  if (!connection) return true;

  return !(
    connection.saveData ||
    (connection.effectiveType &&
      ['slow-2g', '2g'].includes(connection.effectiveType))
  );
};

export const HeroVideo = ({
  desktopSrc,
  mobileSrc,
  poster,
  mobilePoster,
}: HeroVideoProps) => {
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [ready, setReady] = useState(false);
  const [allowVideo] = useState(getInitialVideoPermission);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const inView = useInView(mediaRef, {
    rootMargin: '0px',
    threshold: 0.01,
    once: false,
  });

  const src = isMobile && mobileSrc ? mobileSrc : desktopSrc;
  const activePoster = isMobile && mobilePoster ? mobilePoster : poster;
  const shouldRenderVideo =
    ready && allowVideo && !reducedMotion && failedSrc !== src;

  useEffect(() => {
    const markReady = () => setReady(true);

    if (document.readyState === 'complete') {
      markReady();
      return;
    }

    window.addEventListener('load', markReady, { once: true });
    return () => window.removeEventListener('load', markReady);
  }, []);

  useEffect(() => {
    if (!shouldRenderVideo) return;

    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      void video.play().catch(() => setFailedSrc(src));
    } else {
      video.pause();
    }

    return () => video.pause();
  }, [inView, shouldRenderVideo, src]);

  return (
    <div ref={mediaRef} className={styles.media} aria-hidden="true">
      {mobilePoster && (
        <link
          rel="preload"
          as="image"
          href={mobilePoster}
          media={MOBILE_QUERY}
          fetchPriority="high"
        />
      )}
      <link
        rel="preload"
        as="image"
        href={poster}
        media={mobilePoster ? '(min-width: 768px)' : undefined}
        fetchPriority="high"
      />

      <picture className={styles.picture}>
        {mobilePoster && (
          <source media={MOBILE_QUERY} srcSet={mobilePoster} />
        )}
        <img
          src={poster}
          alt=""
          width={720}
          height={1280}
          className={styles.poster}
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {shouldRenderVideo && (
        <video
          key={src}
          ref={videoRef}
          className={styles.video}
          src={src}
          poster={activePoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onError={() => setFailedSrc(src)}
          tabIndex={-1}
        />
      )}
    </div>
  );
};
