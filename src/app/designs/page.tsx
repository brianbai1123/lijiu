import type { Metadata } from "next";

import { DesignGallery } from "./gallery";

export const metadata: Metadata = {
  title: "历久 · 视觉提案",
  description: "宣纸朱印、青灯碑刻、朱栏编辑室、多巴胺。选定后再改现站。",
  robots: { index: false, follow: false },
};

export default function DesignsPage() {
  return <DesignGallery />;
}
