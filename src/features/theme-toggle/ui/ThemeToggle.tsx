"use client";

import { MoonStar, SunDim } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState, useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.scss";

type Theme = "light" | "dark";

type ThemeTransition = {
  from: Theme;
  to: Theme;
};

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;
const getTheme = (resolvedTheme?: string): Theme =>
  resolvedTheme === "dark" ? "dark" : "light";

export const ThemeToggle = () => {
  const t = useTranslations("ThemeToggle");
  const { resolvedTheme, setTheme } = useTheme();
  const [transition, setTransition] = useState<ThemeTransition | null>(null);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!mounted) {
    return (
      <span
        className={`${styles.toggle} ${styles.placeholder}`}
        aria-hidden
      />
    );
  }

  const currentTheme = getTheme(resolvedTheme);
  const isDark = currentTheme === "dark";

  const handleToggle = () => {
    if (transition) {
      return;
    }

    const nextTheme: Theme = isDark ? "light" : "dark";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(nextTheme);
      return;
    }

    setTransition({ from: currentTheme, to: nextTheme });
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-busy={transition !== null}
      aria-label={t("label")}
      title={isDark ? t("dark") : t("light")}
      className={styles.toggle}
      onClick={handleToggle}
    >
      {transition ? (
        <>
          {transition.from === "light" ? (
            <SunDim
              className={`${styles.icon} ${styles.sunExit}`}
              aria-hidden
            />
          ) : (
            <MoonStar
              className={`${styles.icon} ${styles.moonExit}`}
              aria-hidden
            />
          )}
          {transition.to === "dark" ? (
            <MoonStar
              className={`${styles.icon} ${styles.moonEnter}`}
              aria-hidden
              onAnimationEnd={() => setTransition(null)}
            />
          ) : (
            <SunDim
              className={`${styles.icon} ${styles.sunEnter}`}
              aria-hidden
              onAnimationEnd={() => setTransition(null)}
            />
          )}
        </>
      ) : isDark ? (
        <MoonStar className={styles.icon} aria-hidden />
      ) : (
        <SunDim className={styles.icon} aria-hidden />
      )}
    </button>
  );
};
