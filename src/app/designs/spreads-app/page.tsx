import type { Metadata } from "next";

import { categories, principleById } from "@/data/principles";

import "../spreads-app.css";
import { AppSpreadLab } from "./gallery";

export const metadata: Metadata = {
  title: "历久 · 开本三版（互联网风）",
  description: "深色控制台、明亮产品页、工作台。参考头部互联网产品的开本设计。",
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

export default function SpreadsAppPage() {
  const samples = SAMPLE_IDS.map((id) => {
    const principle = principleById.get(id);
    if (!principle) {
      throw new Error(`缺少原则：${id}`);
    }
    const category = categories.find((item) => item.id === principle.category);
    const quote = principle.quotes[0];
    return {
      id: principle.id,
      title: principle.title,
      check: principle.check,
      trigger: principle.trigger,
      essence: principle.essence,
      categoryName: category?.name ?? "",
      ageYears: principle.ageYears,
      quoteText: quote?.text ?? "",
      quoteSource: quote?.source ?? "",
      quoteEra: quote?.era ?? "",
      tags: principle.tags.slice(0, 3),
    };
  });

  return <AppSpreadLab samples={samples} />;
}
