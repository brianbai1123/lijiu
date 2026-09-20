import type { Metadata } from "next";

import { categories, principleById } from "@/data/principles";

import "../spreads.css";
import { SpreadLab } from "./gallery";

export const metadata: Metadata = {
  title: "历久 · 开本三版",
  description: "留白、装帧、档案。同一种开本结构的三种精细化方向。",
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

export default function SpreadsPage() {
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

  return <SpreadLab samples={samples} />;
}
