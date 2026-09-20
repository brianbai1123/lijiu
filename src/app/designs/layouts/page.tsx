import type { Metadata } from "next";

import "../layouts.css";
import { LayoutLab } from "./gallery";

export const metadata: Metadata = {
  title: "历久 · 排版实验室",
  description: "长卷、开本、一条。不用卡片格子的三种排法。",
  robots: { index: false, follow: false },
};

export default function LayoutsPage() {
  return <LayoutLab />;
}
