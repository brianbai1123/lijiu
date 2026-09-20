import localFont from "next/font/local";
import { Noto_Serif_SC } from "next/font/google";

import "./designs.css";

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-noto-serif",
});

const moeLi = localFont({
  src: "../../fonts/TW-MOE-Li.ttf",
  display: "swap",
  variable: "--font-lishu",
  weight: "400",
  adjustFontFallback: "Times New Roman",
});

export default function DesignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${notoSerif.variable} ${moeLi.variable}`}>{children}</div>
  );
}
