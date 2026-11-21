import aboutImage from '@shared/assets/about.png';

export type ServiceIconName =
  | 'camera'
  | 'video'
  | 'clapperboard'
  | 'film'
  | 'hd'
  | 'fullscreen'
  | 'reels';

export type ServiceMedia =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; poster?: string };

export type ServiceGalleryItem = {
  label: string;
  text: string;
  icon: ServiceIconName;
  media: ServiceMedia;
};

type ServiceMediaOptions = {
  type?: ServiceMedia['type'];
  poster?: string;
};

const VIDEO_EXTENSION_RE = /\.(mp4|webm|ogg|ogv|mov|m4v)$/i;

/**
 * Приводит media из админки к строгому типу.
 * Если админка присылает только ссылку, тип определяется по расширению.
 * Для CDN-ссылок без расширения тип лучше передавать явно.
 */
export const resolveServiceMedia = (
  src: string,
  options: ServiceMediaOptions = {}
): ServiceMedia => {
  const path = src.split(/[?#]/)[0];
  const type =
    options.type ?? (VIDEO_EXTENSION_RE.test(path) ? 'video' : 'image');

  return type === 'video'
    ? { type: 'video', src, poster: options.poster }
    : { type: 'image', src };
};

export const useGetServicesGallery = (): ServiceGalleryItem[] => [
  {
    label: 'Фото',
    text: 'Профессиональная фотосъёмка турниров и мероприятий',
    icon: 'camera',
    media: resolveServiceMedia(aboutImage.src),
  },
  {
    label: 'Видео',
    text: 'Съёмка и монтаж видео высокого качества',
    icon: 'video',
    media: resolveServiceMedia('/videos/hero_video_h264.mp4', {
      poster: '/videos/hero_video_poster.jpg',
    }),
  },
  {
    label: 'Рилс',
    text: 'Короткие вертикальные ролики для соцсетей',
    icon: 'reels',
    media: resolveServiceMedia('/videos/hero_video_h264.mp4', {
      poster: '/videos/hero_video_poster.jpg',
    }),
  },
  {
    label: 'Шортс',
    text: 'Динамичные ролики для Shorts и Reels',
    icon: 'film',
    media: resolveServiceMedia('/videos/hero_video_h264.mp4', {
      poster: '/videos/hero_video_poster.jpg',
    }),
  },
  {
    label: 'Бэк',
    text: 'Бэкстейдж соревнований и закулисье',
    icon: 'clapperboard',
    media: resolveServiceMedia('/videos/hero_video_h264.mp4', {
      poster: '/videos/hero_video_poster.jpg',
    }),
  },
];
