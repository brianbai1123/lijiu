import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { checks } from "../src/data/checks.ts";
import { quadrantModels } from "../src/data/quadrant-models.ts";
import { stemSections } from "../src/data/stem-models.ts";

const principlesSrc = readFileSync(
  new URL("../src/data/principles.ts", import.meta.url),
  "utf8",
);
const enrichmentsSrc = readFileSync(
  new URL("../src/data/enrichments.ts", import.meta.url),
  "utf8",
);

test("七个习惯卡接在品格与自我末尾，check 与 trigger 固定", () => {
  assert.match(
    principlesSrc,
    /id: "know-when-enough"[\s\S]*id: "seven-habits"[\s\S]*id: "reciprocity"/,
  );
  assert.match(
    principlesSrc,
    /id: "seven-habits"[\s\S]*?title: "高效能人士的七个习惯"[\s\S]*?category: "character"/,
  );
  assert.equal(checks["seven-habits"].trigger, "想改别人时");
  assert.equal(
    checks["seven-habits"].check,
    "七条习惯是台阶不是菜单。自己还站不稳，对人的技巧全是表演。",
  );
});

test("七个习惯卡覆盖完整七级，且不整段照抄原书", () => {
  const haystack = [
    principlesSrc,
    enrichmentsSrc,
    JSON.stringify(quadrantModels["seven-habits"]),
    JSON.stringify(stemSections["seven-habits"]),
  ].join("\n");
  for (const habit of [
    "刺激来了，你还能选",
    "先想清楚要去哪",
    "重要的事往往不响铃",
    "别把饼看成死的",
    "先听懂，再被听懂",
    "差别是材料，不是错误",
    "刀不磨会钝",
  ]) {
    assert.match(principlesSrc, new RegExp(habit.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(principlesSrc, /最难的事：不许从第四条开始/);
  assert.match(principlesSrc, /第一性原理：从「人没法替别人负责」推起/);
  assert.match(principlesSrc, /双向反查/);
  assert.doesNotMatch(
    haystack,
    /Between stimulus and response there is a space/,
  );
  assert.doesNotMatch(haystack, /emotional bank account/i);
  assert.doesNotMatch(haystack, /P\/PC/);
});

test("七个习惯卡四象限与 STEM 四块", () => {
  const model = quadrantModels["seven-habits"];
  assert.ok(model);
  assert.equal(
    model.heading,
    "效能四象限：自己站稳了没有 × 跟别人一起赢了没有",
  );
  assert.deepEqual(
    model.quadrants.map((q) => q.name),
    ["等别人先动", "一个人赢", "先改别人", "一起做成"],
  );
  assert.match(model.transitions.join("\n"), /假出路/);

  const stem = stemSections["seven-habits"];
  assert.ok(stem);
  assert.deepEqual(
    stem.blocks.map((block) => block.id),
    ["sr-gap", "interrupt-priority", "superadditivity", "capital-wear"],
  );
  for (const block of stem.blocks) {
    assert.ok(block.formula);
    assert.ok(block.body);
  }
});

test("七个习惯卡故事与史料自查", () => {
  assert.match(enrichmentsSrc, /都江堰岁修/);
  assert.match(enrichmentsSrc, /阿波罗倒推/);
  assert.match(enrichmentsSrc, /廉颇蔺相如/);
  assert.match(enrichmentsSrc, /土法炼钢/);
  assert.match(enrichmentsSrc, /切尔诺贝利/);
  assert.match(enrichmentsSrc, /赵括纸上谈兵/);
  assert.match(enrichmentsSrc, /史料自查：/);
});
