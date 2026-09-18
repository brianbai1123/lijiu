import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans_TC } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const sourceHanSans = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-source-han",
});

const moeLi = localFont({
  src: "../fonts/TW-MOE-Li.ttf",
  display: "swap",
  variable: "--font-lishu",
  weight: "400",
  adjustFontFallback: "Times New Roman",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "歷久 · 經時間檢驗的人生原則",
  description:
    "35 條被不同文明、不同學科反覆獨立驗證的人生原則。每一條都附原典出處、跨文明印證、實踐方法、常見誤讀，以及它的失效邊界。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      suppressHydrationWarning
      className={`${sourceHanSans.variable} ${sourceHanSans.className} ${moeLi.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
