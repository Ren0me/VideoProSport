"use client";

import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";
import styles from "./PrismCarousel.module.scss";

export type PrismCarouselItem = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  href?: string;
};

export type PrismCarouselProps = {
  items: PrismCarouselItem[];
  startIndex?: number;
  /** Width divided by height of the active image. */
  aspect?: number;
  /** Active image height as a fraction of the stage. */
  size?: number;
  /** Neighbour height relative to the active image. */
  neighborScale?: number;
  gap?: number;
  radius?: number;
  /** Colour allowed into inactive images, 0 = monochrome, 1 = full colour. */
  saturation?: number;
  dim?: number;
  /** Strength of the spectrum sweep, 0 disables it. */
  sweep?: number;
  sweepDuration?: number;
  autoplay?: boolean;
  interval?: number;
  loop?: boolean;
  captions?: boolean;
  controls?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
  paused?: boolean;
  ariaLabel?: string;
  onIndexChange?: (index: number) => void;
  onSelect?: (item: PrismCarouselItem, index: number) => void;
  className?: string;
  style?: CSSProperties;
};

const clampIndex = (index: number, length: number) =>
  length <= 0 ? 0 : Math.min(length - 1, Math.max(0, index));

const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

const getReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const PrismCarousel = ({
  items,
  startIndex = 0,
  aspect = 1.5,
  size = 0.62,
  neighborScale = 0.66,
  gap = 14,
  radius = 18,
  saturation = 0,
  dim = 0.2,
  sweep = 1,
  sweepDuration = 1.1,
  autoplay = true,
  interval = 4.5,
  loop = true,
  captions = true,
  controls = true,
  draggable = true,
  pauseOnHover = true,
  paused = false,
  ariaLabel = "Карусель портфолио",
  onIndexChange,
  onSelect,
  className,
  style,
}: PrismCarouselProps) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: number; x: number; dx: number } | null>(null);
  const suppressClickRef = useRef(false);

  const [stage, setStage] = useState({ width: 0, height: 0 });
  const [activeState, setActive] = useState(startIndex);
  const active = clampIndex(activeState, items.length);
  const [hovered, setHovered] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setStage((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height },
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = useCallback(
    (direction: 1 | -1) => {
      setActive((prev) => {
        const length = items.length;
        if (length <= 0) return 0;
        const next = prev + direction;
        if (next < 0) return loop ? length - 1 : 0;
        if (next >= length) return loop ? 0 : length - 1;
        return next;
      });
    },
    [items.length, loop],
  );

  const goTo = useCallback(
    (index: number) => setActive(clampIndex(index, items.length)),
    [items.length],
  );

  useEffect(() => {
    onIndexChange?.(active);
  }, [active, onIndexChange]);

  useEffect(() => {
    if (!autoplay || paused || reduced || items.length < 2) return;
    if (pauseOnHover && hovered) return;
    const timer = window.setTimeout(
      () => go(1),
      Math.max(0.5, interval) * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [
    active,
    autoplay,
    paused,
    reduced,
    items.length,
    pauseOnHover,
    hovered,
    interval,
    go,
  ]);

  const metrics = useMemo(() => {
    const { width, height } = stage;
    if (!width || !height) return null;
    const captionSpace = captions ? Math.min(112, height * 0.24) : 58;
    const areaHeight = Math.max(0, height - captionSpace);
    const activeHeight = Math.min(areaHeight * size, (width * 0.9) / aspect);
    const activeWidth = activeHeight * aspect;
    const step = activeWidth * 0.55 + gap;
    return { activeHeight, activeWidth, step, captionSpace };
  }, [stage, captions, size, aspect, gap]);

  const activeItem = items[active];

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    suppressClickRef.current = false;
    dragRef.current = { id: event.pointerId, x: event.clientX, dx: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    drag.dx = event.clientX - drag.x;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    if (Math.abs(drag.dx) > 48) {
      suppressClickRef.current = true;
      go(drag.dx < 0 ? 1 : -1);
    }
  };

  const handleCardClick = (item: PrismCarouselItem, index: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    if (index !== active) {
      goTo(index);
      return;
    }
    onSelect?.(item, index);
    if (item.href) window.open(item.href, "_blank", "noopener,noreferrer");
  };

  const rootStyle = {
    "--prism-sweep-duration": `${sweepDuration}s`,
    "--prism-saturation": saturation,
    "--prism-dim": dim,
    "--prism-caption-space": `${metrics?.captionSpace ?? 92}px`,
    ...style,
  } as CSSProperties;

  return (
    <div
      className={cn(
        styles.root,
        reduced && styles.reduced,
        (reduced || sweep <= 0) && styles.noSweep,
        className,
      )}
      style={rootStyle}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={stageRef}
        className={styles.stage}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {metrics &&
          items.map((item, index) => {
            let distance = index - active;
            if (loop && items.length > 1) {
              if (distance > items.length / 2) distance -= items.length;
              if (distance < -items.length / 2) distance += items.length;
            }
            const distanceAbs = Math.abs(distance);
            const isActive = distance === 0;
            const visible = distanceAbs <= 2;
            const scale = isActive
              ? 1
              : Math.max(0.4, Math.pow(neighborScale, distanceAbs));
            const rotate = isActive
              ? 0
              : Math.max(-24, Math.min(24, distance * -14));
            const opacity = !visible
              ? 0
              : isActive
                ? 1
                : Math.max(0.14, 1 - dim * distanceAbs);

            return (
              <article
                key={`${item.src}-${index}`}
                className={cn(styles.card, isActive && styles.cardActive)}
                style={{
                  width: metrics.activeWidth,
                  height: metrics.activeHeight,
                  transform: `translate(-50%, -50%) translateX(${
                    distance * metrics.step
                  }px) rotateY(${rotate}deg) scale(${scale})`,
                  opacity,
                  zIndex: 40 - Math.round(distanceAbs),
                  pointerEvents: visible ? "auto" : "none",
                  "--prism-card-dist": Math.min(distanceAbs, 2),
                } as CSSProperties}
                aria-hidden={!isActive}
                tabIndex={visible ? 0 : -1}
                onClick={() => handleCardClick(item, index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCardClick(item, index);
                  }
                }}
              >
                <div
                  className={styles.frame}
                  style={{ borderRadius: radius }}
                >
                  <Image
                    className={styles.colorImage}
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 92vw, 720px"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                  <Image
                    className={styles.monoImage}
                    src={item.src}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 768px) 92vw, 720px"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.shade} aria-hidden="true" />
                  {isActive && (
                    <span className={styles.prismBand} aria-hidden="true" />
                  )}
                </div>
              </article>
            );
          })}
      </div>

      {captions && activeItem && (
        <div className={styles.caption} aria-live="polite">
          <span className={styles.title}>{activeItem.title}</span>
          {activeItem.subtitle && (
            <span className={styles.subtitle}>{activeItem.subtitle}</span>
          )}
        </div>
      )}

      {controls && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            aria-label="Предыдущий слайд"
            onClick={() => go(-1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <div
            className={styles.dots}
            role="group"
            aria-label="Навигация по слайдам"
          >
            {items.map((item, index) => {
              const isActive = index === active;

              return (
                <button
                  key={`${item.src}-dot-${index}`}
                  type="button"
                  className={cn(styles.dot, isActive && styles.dotActive)}
                  aria-label={`Слайд ${index + 1}: ${item.title ?? item.alt}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => goTo(index)}
                />
              );
            })}
          </div>
          <button
            type="button"
            className={styles.control}
            aria-label="Следующий слайд"
            onClick={() => go(1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
};
