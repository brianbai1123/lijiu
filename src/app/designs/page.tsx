import type { Metadata } from "next";
import localFont from "next/font/local";

import { DesignGallery } from "./gallery";

const moeLi = localFont({
  src: "../../fonts/TW-MOE-Li.ttf",
  display: "swap",
  variable: "--font-lishu",
  weight: "400",
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  title: "历久 · 视觉提案",
  description: "宣纸朱印、青灯碑刻、朱栏编辑室、多巴胺。选定后再改现站。",
  robots: { index: false, follow: false },
};

export default function DesignsPage() {
  return (
    <div className={moeLi.variable}>
      <DesignGallery />
    </div>
  );
}
