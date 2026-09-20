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

const model = quadrantModels.incentives;
const stem = stemSections.incentives;
const byId = new Map(model.quadrants.map((q) => [q.id, q]));

test("第六卡弹窗主 check 不换", () => {
  assert.equal(
    checks.incentives.check,
    "公司文化写在墙上，真实文化写在奖金里。",
  );
  assert.equal(checks.incentives.trigger, "看人做事时");
});

test("最难的事：不拿自己的诚意当证据", () => {
  assert.match(principlesSrc, /title: "最难的事：不拿自己的诚意当证据"/);
  assert.match(principlesSrc, /title: "查三笔账：谁拿钱、谁赔钱、谁赔不到"/);
  assert.match(principlesSrc, /真心不能作为证据使用/);
  assert.match(principlesSrc, /激励最深的控制，正是不需要你承认自己被控制/);
  assert.match(principlesSrc, /他赔不到的那部分由谁赔/);
});

test("第一性原理：从什么需要花钱推起", () => {
  assert.match(principlesSrc, /第一性原理：从什么需要花钱推起/);
  assert.match(principlesSrc, /零成本的信号不携带信息/);
  assert.match(principlesSrc, /承诺是免费样品，激励是账单/);
});

test("四象限四格与假出路", () => {
  assert.match(model.heading, /兑现度 × 对准度/);
  assert.deepEqual(
    model.quadrants.map((q) => q.name),
    ["墙皮", "画饼", "喂歪", "同一口锅"],
  );
  assert.deepEqual(
    new Set(model.quadrants.map((q) => `${q.y}-${q.x}`)),
    new Set(["high-high", "high-low", "low-high", "low-low"]),
  );
  assert.match(byId.get("wallpaper").reminder, /标准不存在/);
  assert.match(byId.get("pie").reminder, /人听的是后者/);
  assert.match(byId.get("samepot").reminder, /整锅就白焊/);
  assert.match(model.transitions.join("\n"), /一条假出路：喂歪退回画饼/);
  assert.match(model.transitions.join("\n"), /第一刀要落在最大受益者身上/);
  assert.match(model.summary, /软弱的正确激励让人失望/);
});

test("第六卡 STEM 四块避开前五卡", () => {
  assert.deepEqual(
    stem.blocks.map((b) => b.id),
    ["incentive-compatible", "proxy-reward", "breeders-equation", "convexity"],
  );
  assert.match(stem.blocks[1].body, /执行力是放大器/);
  assert.match(stem.blocks[2].formula, /R = h² · S/);
  assert.match(stem.blocks[2].close, /你提拔谁，就是在复制谁/);
  assert.match(stem.blocks[3].close, /风险的真实主人/);
});

test("故事替换与史料自查", () => {
  assert.match(enrichmentsSrc, /首级计功：赏的是脑袋，不是胜利/);
  assert.match(enrichmentsSrc, /富国银行未授权账户/);
  assert.doesNotMatch(enrichmentsSrc, /title: "苏联钉子厂/);
  assert.doesNotMatch(enrichmentsSrc, /title: "英国东印度公司/);
  assert.match(enrichmentsSrc, /史料自查：寓言不冒充史料/);
  assert.match(enrichmentsSrc, /文化没有难改，它只是从来没被出价买过/);
  assert.match(enrichmentsSrc, /嘴会配合你的价值观，脚只服从地面/);
});

test("corroborations 不与原典重复，limits 接上名声会复利", () => {
  assert.match(principlesSrc, /厄普顿·辛克莱/);
  assert.match(principlesSrc, /古德哈特定律/);
  assert.match(principlesSrc, /你以为他在亏，他在定投/);
  assert.doesNotMatch(principlesSrc, /商鞅「徙木立信」是用一次兑现/);
});
