'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

type LazyMountProps = {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number | string;
  className?: string;
  style?: CSSProperties;
};

export const LazyMount = ({
  children,
  rootMargin = '400px 0px',
  minHeight = 1,
  className,
  style,
}: LazyMountProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;

    const element = rootRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      // Capability fallback: without IO, mount immediately instead of hiding content.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setMounted(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        ...style,
        minHeight: mounted ? style?.minHeight : minHeight,
      }}
    >
      {mounted ? children : null}
    </div>
  );
};
