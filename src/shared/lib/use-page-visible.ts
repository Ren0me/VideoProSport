'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => {
  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
};

const getSnapshot = () => !document.hidden;
const getServerSnapshot = () => true;

export const usePageVisible = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
