"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@shared/i18n";
import { PillNav } from "@shared/ui";
import logo from "@shared/assets/logo.png";
import { useGetNavList } from "../lib";
import styles from "./Header.module.scss";
import { ProfileLink } from "@features/profile";

const SCROLL_THRESHOLD = 24;
const COMPACT_HEADER_MEDIA = "(max-width: 535px)";

export const Header = ({ children }: { children?: ReactNode }) => {
  const navItems = useGetNavList();
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompactHeader, setIsCompactHeader] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(COMPACT_HEADER_MEDIA);
    const update = () => setIsCompactHeader(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) {
      return;
    }

    const root = document.documentElement;
    const update = () => {
      root.style.setProperty("--header-height", `${header.offsetHeight}px`);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);

    return () => {
      observer.disconnect();
      root.style.removeProperty("--header-height");
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={styles.header}
      data-scrolled={isScrolled ? "" : undefined}
    >
      <Link href="/" className={styles.logoLink}>
        <Image
          src={logo}
          alt="Video Pro Sport"
          width={160}
          height={80}
          loading="eager"
          fetchPriority="high"
          className={styles.logo}
        />
      </Link>

      <div className={styles.nav}>
        <PillNav
          items={navItems}
          activeHref="/"
          itemStyle="plain"
          hoverEffect="glide"
          indicator="pill"
          layout="split"
          surface="glass"
          size="md"
          bounce={0.6}
          stretch={0}
          collapse={isCompactHeader ? "always" : "auto"}
          intro={false}
          panelFooter={
            <div className={styles.panelProfile}>
              <ProfileLink />
            </div>
          }
        />
      </div>

      <div className={styles.actions}>
        {children}
        <div className={styles.profileSlot}>
          <ProfileLink />
        </div>
      </div>
    </header>
  );
};
