import {
  Camera,
  Clapperboard,
  Film,
  Fullscreen,
  Hd,
  Sparkles,
  SquarePlay,
  Video,
  type LucideIcon,
} from 'lucide-react';

import type { ServiceIconName } from '../lib/use-get-services-gallery';

export const SERVICE_ICONS: Record<ServiceIconName, LucideIcon> = {
  camera: Camera,
  video: Video,
  clapperboard: Clapperboard,
  film: Film,
  hd: Hd,
  fullscreen: Fullscreen,
  reels: SquarePlay,
};

export const FALLBACK_SERVICE_ICON = Sparkles;
