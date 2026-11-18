import localFont from "next/font/local";

export const montserrat = localFont({
  src: [
    {
      path: "../assets/fonts/Montserrat-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});
