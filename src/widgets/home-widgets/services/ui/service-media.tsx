'use client';

import { useEffect, useRef } from 'react';

import type { ServiceMedia } from '../lib/use-get-services-gallery';

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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active && !reducedMotion) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, reducedMotion, media.src, media.type]);

  if (media.type === 'video') {
    return (
      <video
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        tabIndex={-1}
      />
    );
  }

  // Media may come from an external admin/CDN URL, so next/image is not applicable here.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={media.src} alt="" draggable={false} />;
};
