"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export const ThemeProvider = ({
  scriptProps,
  ...props
}: ComponentProps<typeof NextThemesProvider>) => {
  return (
    <NextThemesProvider
      {...props}
      scriptProps={{
        ...scriptProps,
        type:
          typeof window === "undefined" ? "text/javascript" : "text/plain",
      }}
    />
  );
};
