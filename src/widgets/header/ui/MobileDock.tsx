"use client";

import type { Ref } from "react";
import { Link } from "@shared/i18n/navigation";
import { PillNav, type PillNavItem } from "@shared/ui";
import { MOBILE_NAV_ITEMS } from "../lib";
import styles from "./MobileDock.module.scss";

type MobileDockProps = {
  activeHref: string;
  menuOpen: boolean;
  isHidden: boolean;
  containerRef: Ref<HTMLDivElement>;
  onMenuToggle: (open: boolean) => void;
};

export const MobileDock = ({
  activeHref,
  menuOpen,
  isHidden,
  containerRef,
  onMenuToggle,
}: MobileDockProps) => {
  const items: PillNavItem[] = MOBILE_NAV_ITEMS.map(({ icon: Icon, ...item }) => ({
    ...item,
    icon: <Icon aria-hidden="true" strokeWidth={1.8} />,
    ariaLabel: item.href
      ? item.ariaLabel
      : menuOpen
        ? "Закрыть меню"
        : "Открыть меню",
    ariaExpanded: item.href ? undefined : menuOpen,
  }));

  return (
    <div
      ref={containerRef}
      className={styles.dock}
      data-hidden={isHidden ? "" : undefined}
    >
      <PillNav
        items={items}
        activeHref={activeHref}
        iconOnly
        ariaLabel="Мобильная навигация"
        linkComponent={Link}
        layout="joined"
        surface="glass"
        size="lg"
        itemStyle="plain"
        hoverEffect="glide"
        indicator="pill"
        bounce={0.6}
        stretch={0}
        intro={false}
        collapse="never"
        onItemClick={(item) => onMenuToggle(item.href ? false : !menuOpen)}
      />
    </div>
  );
};
