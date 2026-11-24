'use client';

import { useEffect, useState, type RefObject } from 'react';

type UseInViewOptions = {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

export const useInView = <T extends Element>(
  ref: RefObject<T | null>,
  {
    rootMargin = '200px 0px',
    threshold = 0,
    once = true,
  }: UseInViewOptions = {}
) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      // Capability fallback: without IO, render everything instead of hiding content.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
          return;
        }

        if (!once) setInView(false);
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, ref, rootMargin, threshold]);

  return inView;
};
