import { Noto_Serif_SC } from "next/font/google";

import "./designs.css";

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-noto-serif",
});

export default function DesignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={notoSerif.variable}>{children}</div>;
}
