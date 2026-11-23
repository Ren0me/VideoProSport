"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, usePathname } from "@shared/i18n";
import { PillNav } from "@shared/ui";
import logo from "@shared/assets/logo.png";
import { useGetNavList } from "../lib";
import { MobileDock } from "./MobileDock";
import styles from "./Header.module.scss";
import { ProfileLink } from "@features/profile";

const SCROLL_THRESHOLD = 24;
const NEXT_SECTION_VISIBLE_THRESHOLD = 4;
const COMPACT_HEADER_MEDIA = "(max-width: 768px)";

const normalizePath = (pathname: string) =>
  pathname.replace(/^\/(ru|en)(?=\/|$)/, "") || "/";

export const Header = ({ children }: { children?: ReactNode }) => {
  const pathname = usePathname();
  const path = normalizePath(pathname);
  const isHome = path === "/";
  const navItems = useGetNavList({ page: isHome ? "home" : "another" }).map(
    ({ icon: Icon, ...item }) => ({
      ...item,
      icon: Icon ? <Icon aria-hidden="true" strokeWidth={1.8} /> : undefined,
    }),
  );
  const headerRef = useRef<HTMLElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDockRevealed, setIsDockRevealed] = useState(false);
  const [isCompactHeader, setIsCompactHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");

  const activeHref = isHome ? hash || "/" : path;
  const isDockHidden = isHome && !isDockRevealed && !menuOpen;

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    const query = window.matchMedia(COMPACT_HEADER_MEDIA);
    const update = () => setIsCompactHeader(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMenuOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname, isCompactHeader]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > SCROLL_THRESHOLD);

      if (!isHome) {
        setIsDockRevealed(true);
        return;
      }

      // Reveal the dock once the section after the hero is visible by at least
      // 4px, but keep it hidden while the hero is fully in the viewport.
      const viewportHeight = window.innerHeight;
      const heroElement = document.getElementById("main");
      const heroRect = heroElement?.getBoundingClientRect();
      const nextSectionRect = heroElement?.nextElementSibling?.getBoundingClientRect();

      const heroFullyVisible = heroRect
        ? heroRect.top >= 0 && heroRect.bottom <= viewportHeight
        : scrollY < NEXT_SECTION_VISIBLE_THRESHOLD;
      const nextSectionVisible = nextSectionRect
        ? nextSectionRect.top <= viewportHeight - NEXT_SECTION_VISIBLE_THRESHOLD
        : scrollY >= NEXT_SECTION_VISIBLE_THRESHOLD;

      setIsDockRevealed(!heroFullyVisible && nextSectionVisible);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [isHome]);

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
          activeHref={activeHref}
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
          showToggle={!isCompactHeader}
          menuOpen={menuOpen}
          onMenuToggle={setMenuOpen}
          menuTriggerRef={dockRef}
          panelFooter={
            isCompactHeader ? (
              <div className={styles.panelProfile}>
                <ProfileLink />
              </div>
            ) : undefined
          }
        />
      </div>

      <div className={styles.actions}>
        {children}
        <div className={styles.profileSlot}>
          <ProfileLink />
        </div>
      </div>

      {isCompactHeader && (
        <MobileDock
          activeHref={path}
          menuOpen={menuOpen}
          isHidden={isDockHidden}
          containerRef={dockRef}
          onMenuToggle={setMenuOpen}
        />
      )}
    </header>
  );
};
