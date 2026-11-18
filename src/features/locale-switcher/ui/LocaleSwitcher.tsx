"use client";

import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { routing, useRouter, type Locale } from "@shared/i18n";
import styles from "./LocaleSwitcher.module.scss";

export const LocaleSwitcher = () => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const options = routing.locales.map((item) => ({
    value: item,
    label: t(item),
  }));
  const current = options.find((item) => item.value === locale) ?? options[0];

  const change = (nextLocale: Locale) => {
    startTransition(() => {
      const prefix = `/${locale}`;
      const pathname = window.location.pathname;
      const path =
        pathname === prefix
          ? "/"
          : pathname.startsWith(`${prefix}/`)
            ? pathname.slice(prefix.length)
            : pathname;

      router.replace(
        `${path}${window.location.search}${window.location.hash}`,
        { locale: nextLocale },
      );
    });
  };

  const close = (restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  };

  const select = (nextLocale: Locale) => {
    close(true);
    if (nextLocale !== locale) {
      change(nextLocale);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const selectedIndex = routing.locales.findIndex((item) => item === locale);
    optionRefs.current[selectedIndex < 0 ? 0 : selectedIndex]?.focus();

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen, locale]);

  const handleBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
    if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
      close();
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const activeIndex = optionRefs.current.findIndex(
        (option) => option === document.activeElement,
      );
      const delta = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        (activeIndex + delta + options.length) % options.length;
      optionRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      className={styles.root}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-label={t("label")}
        aria-busy={isPending}
        disabled={isPending}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{current?.label}</span>
        <ChevronDown className={styles.chevron} aria-hidden />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <ul
            id={listId}
            role="listbox"
            aria-label={t("label")}
            className={styles.list}
          >
            {options.map((option, index) => (
              <li key={option.value} role="presentation">
                <button
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="option"
                  aria-selected={option.value === locale}
                  className={styles.option}
                  onClick={() => select(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
