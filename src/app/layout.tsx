import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Geist_Mono,
  Noto_Sans_SC,
  Noto_Serif_SC,
} from "next/font/google";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme";
import "lxgw-wenkai-screen-web/lxgwwenkaiscreen/result.css";
import "./globals.css";

const sourceHanSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-source-han",
});

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-noto-serif",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const numerals = Cormorant_Garamond({
  weight: ["500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-numerals",
  display: "swap",
});

export const metadata: Metadata = {
  title: "历久 · 经时间检验的人生原则",
  description:
    "35 条被不同文明、不同学科反复独立验证的人生原则。每一条都附原典出处、跨文明印证、实践方法、常见误读，以及它的失效边界。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${sourceHanSans.variable} ${sourceHanSans.className} ${notoSerif.variable} ${geistMono.variable} ${numerals.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <script src="/reading-room.js?v=2" defer></script>
      </body>
    </html>
  );
}
