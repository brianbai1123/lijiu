import type { Metadata } from "next";

import { categories, principleById } from "@/data/principles";

import "../layouts.css";
import { LayoutLab } from "./gallery";

export const metadata: Metadata = {
  title: "历久 · 排版实验室",
  description: "长卷、开本、一条。不用卡片格子的三种排法。",
  robots: { index: false, follow: false },
};

const SAMPLE_IDS = [
  "dichotomy-of-control",
  "know-what-you-dont-know",
  "listen-to-both-sides",
  "invert",
  "occams-razor",
  "incentives",
  "golden-rule",
  "know-thyself",
  "integrity-alone",
] as const;

export default function LayoutsPage() {
  const samples = SAMPLE_IDS.map((id) => {
    const principle = principleById.get(id);
    if (!principle) {
      throw new Error(`缺少原则：${id}`);
    }
    const category = categories.find((item) => item.id === principle.category);
    return {
      id: principle.id,
      title: principle.title,
      check: principle.check,
      trigger: principle.trigger,
      essence: principle.essence,
      categoryName: category?.name ?? "",
      quoteText: principle.quotes[0]?.text ?? "",
      quoteSource: `${principle.quotes[0]?.source ?? ""} · ${principle.quotes[0]?.era ?? ""}`,
    };
  });

  return <LayoutLab samples={samples} />;
}
