'use client';

import { useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

let mediaQuery: MediaQueryList | null = null;

const getMediaQuery = () => {
  if (!mediaQuery) {
    mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  }

  return mediaQuery;
};

const subscribe = (onChange: () => void) => {
  const query = getMediaQuery();
  query.addEventListener('change', onChange);

  return () => query.removeEventListener('change', onChange);
};

const getSnapshot = () => getMediaQuery().matches;

const getServerSnapshot = () => false;

export const usePrefersReducedMotion = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
