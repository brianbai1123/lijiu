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

function assertStemIds(id, expected) {
  const stem = stemSections[id];
  assert.ok(stem, `缺少 STEM：${id}`);
  assert.deepEqual(
    stem.blocks.map((block) => block.id),
    expected,
  );
  for (const block of stem.blocks) {
    assert.ok(block.formula);
    assert.ok(block.body);
  }
}

function assertQuadrant(id, heading, names) {
  const model = quadrantModels[id];
  assert.ok(model, `缺少四象限：${id}`);
  assert.equal(model.heading, heading);
  assert.deepEqual(
    model.quadrants.map((q) => q.name),
    names,
  );
  assert.deepEqual(
    new Set(model.quadrants.map((q) => `${q.y}-${q.x}`)),
    new Set(["high-high", "high-low", "low-high", "low-low"]),
  );
  for (const quadrant of model.quadrants) {
    assert.ok(quadrant.definition);
    assert.ok(quadrant.logic);
    assert.ok(quadrant.vignette);
    assert.ok(quadrant.examples.length >= 3);
    assert.ok(quadrant.problems.length >= 3);
    assert.ok(quadrant.responses.length >= 3);
    assert.ok(quadrant.reminder);
  }
  assert.match(model.transitions.join("\n"), /假出路/);
}

test("品格六卡弹窗主 check 与 trigger 不换", () => {
  assert.equal(
    checks["golden-rule"].check,
    "规则是一只回旋镖：飞回来时不敢接，扔出去时就不配叫公平。",
  );
  assert.equal(checks["golden-rule"].trigger, "想还手时");
  assert.equal(
    checks["know-thyself"].check,
    "自我是用来丈量世界的尺，也是唯一看不见自己刻度的尺。",
  );
  assert.equal(checks["know-thyself"].trigger, "看不惯谁时");
  assert.equal(
    checks["integrity-alone"].check,
    "聚光灯下的人品可能只是戏服；散场以后不脱，才算长在身上。",
  );
  assert.equal(checks["integrity-alone"].trigger, "没人看见时");
  assert.equal(
    checks["virtue-is-habit"].check,
    "每个重复的动作都是一张选票，日子最后会把票数统计成人格。",
  );
  assert.equal(checks["virtue-is-habit"].trigger, "又立志时");
  assert.equal(
    checks["humility-gains"].check,
    "胜利先拔掉警报器，再把油门做大；许多败局，都从一路顺风开始。",
  );
  assert.equal(checks["humility-gains"].trigger, "刚赢了一把时");
  assert.equal(
    checks["know-when-enough"].check,
    "欲望是一条会后退的终点线；不先画停止线，赢家也会跑下悬崖。",
  );
  assert.equal(checks["know-when-enough"].trigger, "还想再多点时");
});

test("品格六卡最难的事、第一性原理与双向反查", () => {
  const hard = [
    "最难的事：挨了一下之后，还手的额度是你自己签的",
    "最难的事：你要审的那个人，从不出席",
    "最难的事：不当自己的书记员",
    "最难的事：不许身份先到账",
    "最难的事：在庆功的那一周把战果减记",
    "最难的事：停下来之后，没有人再问你在忙什么",
  ];
  for (const title of hard) {
    assert.match(principlesSrc, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(principlesSrc, /第一性原理：为什么「对等」不可能靠感觉执行/);
  assert.match(principlesSrc, /第一性原理：唯一独家的材料，恰好是唯一没法验的材料/);
  assert.match(principlesSrc, /第一性原理：从「观测是抽样的」推起/);
  assert.match(principlesSrc, /第一性原理：决心改起点，重复改那张表/);
  assert.match(principlesSrc, /第一性原理：赢改的是你的输入，不是你的本事/);
  assert.match(principlesSrc, /第一性原理：终点线是用差值画的/);
  const bidirectional = [...principlesSrc.matchAll(/双向反查/g)];
  assert.ok(bidirectional.length >= 6);
});

test("品格六卡四象限与 STEM 四块", () => {
  assertQuadrant("golden-rule", "回旋镖四象限：凭脾气还是凭条款 × 换个人用认不认", [
    "我说了算",
    "照章办他",
    "你来我往",
    "接得住",
  ]);
  assertQuadrant("know-thyself", "自知四象限：说得出毛病吗 × 行为上动没动", [
    "照镜子骂人",
    "自嘲挡箭牌",
    "有人替你兜",
    "有账可查",
  ]);
  assertQuadrant("integrity-alone", "慎独四象限：背人时做不做 × 事后认不认", [
    "暗房",
    "留了底",
    "攒功德",
    "不用换衣服",
  ]);
  assertQuadrant("virtue-is-habit", "练习四象限：到场几次 × 练的是不是正事", [
    "长在身上",
    "练熟了错的",
    "懂了没练",
    "立志重开",
  ]);
  assertQuadrant("humility-gains", "胜利四象限：赢因对没对账 × 下注跟不跟着涨", [
    "顺风加仓",
    "按账加注",
    "白查一场",
    "糊涂赢",
  ]);
  assertQuadrant(
    "know-when-enough",
    "知止四象限：追的是名次还是用途 × 赢来的有没有下桌",
    ["下桌吃饭", "只进不出", "记分牌人生", "越赢越大"],
  );

  assertStemIds("golden-rule", [
    "force-attenuation",
    "feud-r0",
    "noisy-tft",
    "label-swap",
  ]);
  assertStemIds("know-thyself", [
    "zero-offset",
    "persistent-excitation",
    "metacognitive-efficiency",
    "peak-end",
  ]);
  assertStemIds("integrity-alone", [
    "pooling-separating",
    "unobservable-subspace",
    "fatigue-damage",
    "hash-chain",
  ]);
  assertStemIds("virtue-is-habit", [
    "stationary-distribution",
    "hebbian-plasticity",
    "queue-utilization",
    "matching-law",
  ]);
  assertStemIds("humility-gains", [
    "rule-of-three",
    "delay-gain",
    "winners-curse",
    "explore-bonus",
  ]);
  assertStemIds("know-when-enough", [
    "adaptation-level",
    "ruin-barrier",
    "sustainable-yield",
    "present-bias",
  ]);
});

test("品格六卡故事替换与史料自查", () => {
  assert.match(enrichmentsSrc, /利伯守则/);
  assert.match(enrichmentsSrc, /国会问责法/);
  assert.match(enrichmentsSrc, /公敌宣告/);
  assert.match(enrichmentsSrc, /科德曼/);
  assert.match(enrichmentsSrc, /鲍比·琼斯/);
  assert.match(enrichmentsSrc, /大众柴油/);
  assert.match(enrichmentsSrc, /富兰克林的小册子/);
  assert.match(enrichmentsSrc, /阿西洛马/);
  assert.match(enrichmentsSrc, /巴菲特把钱还回去/);
  assert.match(enrichmentsSrc, /Archegos/);
  assert.match(enrichmentsSrc, /史料自查：/);
  assert.doesNotMatch(enrichmentsSrc, /南京大屠杀/);
  assert.doesNotMatch(enrichmentsSrc, /比利时在刚果/);
  assert.doesNotMatch(enrichmentsSrc, /希特勒晚期军事幻想/);
  assert.doesNotMatch(enrichmentsSrc, /title: "亚里士多德：美德即习惯"/);
});
