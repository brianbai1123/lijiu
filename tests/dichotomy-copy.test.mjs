import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  anxietyMatchingNote,
  anxietyModelIntro,
  anxietyQuadrants,
} from "../src/data/anxiety-model.ts";
import { checks } from "../src/data/checks.ts";
import { stemSections } from "../src/data/stem-models.ts";

const principlesSrc = readFileSync(
  new URL("../src/data/principles.ts", import.meta.url),
  "utf8",
);
const enrichmentsSrc = readFileSync(
  new URL("../src/data/enrichments.ts", import.meta.url),
  "utf8",
);

const anxiety = anxietyQuadrants.find((q) => q.id === "anxiety");
const neglect = anxietyQuadrants.find((q) => q.id === "neglect");
const stem = stemSections["dichotomy-of-control"];

test("弹窗主 check 保持发牌出牌", () => {
  assert.equal(
    checks["dichotomy-of-control"].check,
    "命运负责发牌，人只负责出牌；烂牌不是乱打的理由，好牌也不保证必赢。",
  );
});

test("essence 不改，深层表达进入详情而不是卡面", () => {
  assert.match(
    principlesSrc,
    /essence:\s*"把精力全部投向你能决定的那部分/,
  );
  assert.match(principlesSrc, /title: "最难的一步是承认"/);
  assert.match(principlesSrc, /title: "把手伸进那个口子"/);
  assert.match(principlesSrc, /coda:\s*\n?\s*"成熟的标志/);
});

test("承认、口子、认命、失职对偶按区块落位", () => {
  assert.match(principlesSrc, /知道但不愿意承认/);
  assert.match(principlesSrc, /伪装的控制感/);
  assert.match(principlesSrc, /你明明能管，却不愿承担/);
  assert.match(principlesSrc, /把手伸进去/);
  assert.match(principlesSrc, /当成认命/);
  assert.match(principlesSrc, /聚焦的智慧/);
  assert.match(principlesSrc, /能决定、能影响、不能影响/);
  assert.match(principlesSrc, /不想承担那部分可控/);
  assert.match(principlesSrc, /提前撤退/);
  assert.match(enrichmentsSrc, /不是在认命，是在聚焦/);
});

test("STEM 模型写进详情：函数、无用功、催化、爱比克泰德 MDP", () => {
  assert.equal(stem.heading, "STEM模型：你只能努力改变自变量");
  assert.match(stem.intro, /你只能努力改变自变量/);
  assert.doesNotMatch(stem.intro, /选其中一部分自变量/);
  assert.deepEqual(
    stem.blocks.map((block) => block.id),
    ["math", "epictetus", "physics", "chemistry"],
  );
  assert.equal(stem.blocks[0].formula, "Y = f(A, W)");
  assert.match(stem.blocks[0].body, /∂Y\/∂A/);
  assert.match(stem.blocks[1].body, /马尔可夫决策/);
  assert.ok(
    stem.blocks[1].table?.rows.some(([card]) => card.includes("烂牌")),
  );
  assert.match(stem.blocks[2].formula, /F/);
  assert.match(stem.blocks[2].body, /推不动的墙/);
  assert.match(stem.blocks[3].body, /炼金/);
  assert.match(enrichmentsSrc, /你永远不选状态/);

  const detailSrc = readFileSync(
    new URL("../src/components/principle-detail.tsx", import.meta.url),
    "utf8",
  );
  const corroborationsAt = detailSrc.indexOf("独立来源的印证");
  const stemAt = detailSrc.indexOf("<StemModels");
  const practicesAt = detailSrc.indexOf("可以今天就开始做的");
  assert.ok(corroborationsAt > 0 && stemAt > corroborationsAt && practicesAt > stemAt);
});

test("四象限同时打中焦虑空转和失职逃避", () => {
  assert.ok(anxiety);
  assert.ok(neglect);
  assert.match(anxietyModelIntro, /裂开了/);
  assert.match(anxietyModelIntro, /不愿承认自己其实能管/);
  assert.match(anxietyMatchingNote, /匹配问题/);
  assert.match(anxiety.reminder, /惩罚自己/);
  assert.match(neglect.reminder, /我其实管得了/);
});
