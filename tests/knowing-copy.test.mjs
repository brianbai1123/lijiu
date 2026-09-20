import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { checks } from "../src/data/checks.ts";
import {
  knowingModelIntro,
  knowingQuadrants,
  knowingSummary,
  knowingTransitions,
} from "../src/data/knowing-model.ts";
import { stemSections } from "../src/data/stem-models.ts";

const principlesSrc = readFileSync(
  new URL("../src/data/principles.ts", import.meta.url),
  "utf8",
);
const enrichmentsSrc = readFileSync(
  new URL("../src/data/enrichments.ts", import.meta.url),
  "utf8",
);

const stem = stemSections["know-what-you-dont-know"];
const byId = new Map(knowingQuadrants.map((q) => [q.id, q]));

test("第二卡弹窗主 check 不换", () => {
  assert.equal(
    checks["know-what-you-dont-know"].check,
    "不知道，只是房间还空著；自以为知道，才会把求知的门焊死。",
  );
  assert.equal(checks["know-what-you-dont-know"].trigger, "觉得懂了时");
});

test("最难的事落在察觉之前，不复用第一卡的「承认」", () => {
  assert.match(principlesSrc, /title: "最难的事：在你毫无不适的地方起疑"/);
  assert.match(principlesSrc, /title: "感觉不到，就装仪表"/);
  assert.match(principlesSrc, /无知不带痛感，它伪装成清晰/);
  assert.match(principlesSrc, /顺畅是个反向指标/);
});

test("第一性原理：地图推导五步并落到入口", () => {
  assert.match(principlesSrc, /第一性原理：地图上不会写「这里没画」/);
  assert.match(principlesSrc, /没画的东西不会显示成空白，会显示成「不存在」/);
  assert.match(principlesSrc, /是图上的入口/);
});

test("认知四象限用把握 × 依据，且补上哑掉的知道", () => {
  assert.equal(knowingQuadrants.length, 4);
  assert.deepEqual(
    new Set(knowingQuadrants.map((q) => `${q.grip}-${q.evidence}`)),
    new Set(["high-high", "high-low", "low-high", "low-low"]),
  );
  assert.match(knowingModelIntro, /被填满的空白/);
  assert.match(byId.get("hollow").reminder, /讲得最顺的地方，查得最少/);
  assert.match(byId.get("mute").vignette, /老师傅摸了三十年的设备/);
  assert.match(byId.get("mute").problems.join("\n"), /挑战者号/);
  assert.match(byId.get("blank").reminder, /空白是入口，不是住处/);
  assert.equal(knowingTransitions.length, 4);
  assert.match(knowingSummary, /摁不住的，先归零/);

  for (const quadrant of knowingQuadrants) {
    assert.ok(quadrant.definition);
    assert.ok(quadrant.logic);
    assert.ok(quadrant.examples.length >= 3);
    assert.ok(quadrant.problems.length >= 3);
    assert.ok(quadrant.responses.length >= 3);
    assert.ok(quadrant.reminder);
  }
});

test("第二卡 STEM 四块量化不确定", () => {
  assert.match(stem.heading, /「不知道」是可以量出来的/);
  assert.deepEqual(
    stem.blocks.map((block) => block.id),
    ["bayes", "entropy", "calibration", "overfitting"],
  );
  assert.match(stem.blocks[0].body, /别写成 0 或 1/);
  assert.match(stem.blocks[1].body, /熵为 0/);
  assert.match(stem.blocks[2].formula, /Brier/);
  assert.match(stem.blocks[3].table.rows.at(-1).join(" "), /自以为懂/);
  for (const block of stem.blocks) {
    assert.ok(block.formula);
    assert.ok(block.body);
  }
});

test("三刀：郭守敬替张衡、史料括注、双向 limits", () => {
  assert.match(enrichmentsSrc, /郭守敬：先修仪器，再去碰结论/);
  assert.doesNotMatch(enrichmentsSrc, /张衡与浑天/);
  assert.match(enrichmentsSrc, /此处为通行转述/);
  assert.match(enrichmentsSrc, /学界仍有争论/);
  assert.match(principlesSrc, /不改变任何行为的谦虚，就是自负换了一件衣服/);
  assert.match(principlesSrc, /边界模糊的谦虚，和边界模糊的自信，是同一个毛病/);
  assert.match(principlesSrc, /事情不可逆，就让不确定拥有否决权/);
});
