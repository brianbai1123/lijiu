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

const model = quadrantModels.invert;
const stem = stemSections.invert;
const byId = new Map(model.quadrants.map((q) => [q.id, q]));

test("第四卡弹窗主 check 不换", () => {
  assert.equal(
    checks.invert.check,
    "造桥前先找它会从哪里塌；成功没有配方，灾难通常有清单。",
  );
  assert.equal(checks.invert.trigger, "定目标时");
});

test("最难的事落在主语：在失败原因里写下自己的名字", () => {
  assert.match(principlesSrc, /title: "最难的事：在失败原因里写下自己的名字"/);
  assert.match(principlesSrc, /title: "让清单长出牙齿：先分级，再压成一个动作"/);
  assert.match(principlesSrc, /想象失败其实很舒服——只要失败的原因不是你/);
  assert.match(principlesSrc, /只给致命失败一票否决权/);
  assert.match(principlesSrc, /不改变任何动作的风险清单，是乐观换了一身工装/);
});

test("第一性原理：乘法怕零", () => {
  assert.match(principlesSrc, /第一性原理：乘法怕零/);
  assert.match(principlesSrc, /成功是合取，失败是析取/);
  assert.match(principlesSrc, /算的是乘法里的那个零/);
});

test("四象限四格命名与迁移", () => {
  assert.match(model.heading, /死法清不清楚 × 后果能不能重来/);
  assert.deepEqual(
    model.quadrants.map((q) => q.name),
    ["磕碰坑", "锁喉坑", "摸黑摔", "黑崖坑"],
  );
  assert.deepEqual(
    new Set(model.quadrants.map((q) => `${q.y}-${q.x}`)),
    new Set(["high-high", "high-low", "low-high", "low-low"]),
  );
  assert.match(byId.get("chokehold").reminder, /不叫意外，叫放任/);
  assert.match(byId.get("scrape").reminder, /输得起还不试/);
  assert.match(model.transitions.join("\n"), /第一步永远是改可逆性/);
  assert.match(model.transitions.join("\n"), /是你下注方式的属性/);

  for (const quadrant of model.quadrants) {
    assert.ok(quadrant.vignette);
    assert.ok(quadrant.examples.length >= 3);
    assert.ok(quadrant.problems.length >= 3);
    assert.ok(quadrant.responses.length >= 3);
  }
});

test("第四卡 STEM 四块，反向可达集并入终局回推", () => {
  assert.match(stem.heading, /失败为什么比成功更容易计算/);
  assert.deepEqual(
    stem.blocks.map((block) => block.id),
    ["backward", "reliability", "faulttree", "feasible"],
  );
  assert.match(stem.blocks[0].body, /反向可达集/);
  assert.match(stem.blocks[1].formula, /0\.9¹⁰/);
  assert.match(stem.blocks[2].body, /幸存者的经验不可靠/);
  assert.match(stem.blocks[3].close, /先把出局画成边界/);
});

test("故事替换与史料自查", () => {
  assert.match(enrichmentsSrc, /检查单的诞生/);
  assert.match(enrichmentsSrc, /算到了，却不可逆/);
  assert.doesNotMatch(enrichmentsSrc, /盟军诺曼底/);
  assert.doesNotMatch(enrichmentsSrc, /大跃进的指标崇拜/);
  assert.match(enrichmentsSrc, /哪些说法是转述，哪些因果被压缩了/);
  assert.match(enrichmentsSrc, /很难不写成后见之明/);
  assert.match(enrichmentsSrc, /态度会累，流程不会/);
});

test("corroborations 用孙子、不伤害、海恩法则", () => {
  assert.match(principlesSrc, /先为不可胜，以待敌之可胜/);
  assert.match(principlesSrc, /首先，不伤害/);
  assert.match(principlesSrc, /海恩法则/);
  assert.match(principlesSrc, /反向思考保护的是进攻能力，不是退场借口/);
  assert.match(principlesSrc, /永远不会有人替你作证/);
});
