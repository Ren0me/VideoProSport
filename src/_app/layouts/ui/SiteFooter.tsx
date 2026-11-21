"use client";

import type { ReactNode } from "react";
import { usePathname } from "@shared/i18n/navigation";

const normalizePath = (pathname: string) =>
  pathname.replace(/^\/(ru|en)(?=\/|$)/, "") || "/";

export const SiteFooter = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const path = normalizePath(pathname);

  if (path === "/" || path === "/profile" || path.startsWith("/profile/")) {
    return null;
  }

  return <>{children}</>;
};
