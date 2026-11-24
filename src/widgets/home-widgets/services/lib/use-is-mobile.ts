'use client';

import { useSyncExternalStore } from 'react';

const MOBILE_QUERY = '(max-width: 520px)';

let mediaQuery: MediaQueryList | null = null;

const getMediaQuery = () => {
  if (!mediaQuery) {
    mediaQuery = window.matchMedia(MOBILE_QUERY);
  }

  return mediaQuery;
};

const subscribe = (onChange: () => void) => {
  const query = getMediaQuery();
  query.addEventListener('change', onChange);

  return () => query.removeEventListener('change', onChange);
};

const getSnapshot = () => getMediaQuery().matches;

const getServerSnapshot = () => null;

export const useIsMobile = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
