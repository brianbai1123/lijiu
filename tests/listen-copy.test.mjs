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

const model = quadrantModels["listen-to-both-sides"];
const stem = stemSections["listen-to-both-sides"];
const byId = new Map(model.quadrants.map((q) => [q.id, q]));

test("第三卡弹窗主 check 不换", () => {
  assert.equal(
    checks["listen-to-both-sides"].check,
    "会议室里一旦只剩回声，坐得最高的人往往最先失明。",
  );
  assert.equal(checks["listen-to-both-sides"].trigger, "要拍板时");
});

test("最难的事落在时序：听到之前先付价", () => {
  assert.match(principlesSrc, /title: "最难的事：在你听到之前，先把价付了"/);
  assert.match(principlesSrc, /title: "把「敢不敢说」改成「轮到谁说」"/);
  assert.match(principlesSrc, /失明不疼。它的症状是顺利/);
  assert.match(principlesSrc, /异议不是意见，是商品/);
  assert.doesNotMatch(principlesSrc, /最难的一步是承认，也不是在毫无不适/);
});

test("第一性原理：误差相关性而非诚恳", () => {
  assert.match(principlesSrc, /第一性原理：为什么「明」不来自听得多/);
  assert.match(principlesSrc, /一个绝对真诚的人转述你的原话，带来的新信息是零/);
  assert.match(principlesSrc, /不是听得多，是听得散/);
});

test("四象限用 GPT 的命名，轴为真话成本 × 独立性", () => {
  assert.match(model.heading, /真话成本 × 信息源独立性/);
  assert.deepEqual(
    model.quadrants.map((q) => q.name),
    ["纠错网络", "热闹的回声", "沉默的哨兵", "密封暗室"],
  );
  assert.deepEqual(
    new Set(model.quadrants.map((q) => `${q.y}-${q.x}`)),
    new Set(["high-high", "high-low", "low-high", "low-low"]),
  );
  assert.match(byId.get("echo").reminder, /回声再响，也不会变成第二条证据/);
  assert.match(byId.get("sentinel").reminder, /沉默从来不是数据/);
  assert.match(model.transitions.join("\n"), /先补独立性，不要先补可得性/);
  assert.match(model.summary, /更多来源说话/);

  for (const quadrant of model.quadrants) {
    assert.ok(quadrant.definition);
    assert.ok(quadrant.logic);
    assert.ok(quadrant.vignette);
    assert.ok(quadrant.examples.length >= 3);
    assert.ok(quadrant.problems.length >= 3);
    assert.ok(quadrant.responses.length >= 3);
  }
});

test("第三卡 STEM 四块量化相关性", () => {
  assert.match(stem.heading, /十个人点头，未必等于十条信息/);
  assert.deepEqual(
    stem.blocks.map((block) => block.id),
    ["effective-n", "ensemble", "feedback", "mutual-information"],
  );
  assert.match(stem.blocks[0].formula, /n_eff/);
  assert.match(stem.blocks[0].close, /相关性在暴露/);
  assert.match(stem.blocks[1].body, /ρσ²/);
  assert.match(stem.blocks[2].body, /只输出正号/);
  assert.match(stem.blocks[2].table.note, /相位与延迟/);
  assert.match(stem.blocks[3].formula, /I\(X; Y₂ \| Y₁\)/);
});

test("三刀：史料自查、罗斯福留正文、双向反查两问", () => {
  assert.match(enrichmentsSrc, /史料自查：这一则我差点写歪/);
  assert.match(enrichmentsSrc, /让信息绕开汇报链/);
  assert.match(enrichmentsSrc, /古巴导弹危机的执委会/);
  assert.match(enrichmentsSrc, /同一批脑子，换一套流程/);
  const roosevelt = enrichmentsSrc.slice(
    enrichmentsSrc.indexOf("让信息绕开汇报链"),
    enrichmentsSrc.indexOf("给议论标上死刑价"),
  );
  assert.match(roosevelt, /混乱恰恰起了作用/);
  assert.doesNotMatch(roosevelt, /刻意制造/);
  assert.match(enrichmentsSrc, /「坑儒」的对象与规模史料有争议/);
  assert.match(principlesSrc, /我上一次改主意是因为谁/);
  assert.match(principlesSrc, /反方最可能在哪个事实或哪一步推理上出错/);
  assert.match(principlesSrc, /五个转述者不能冒充五个证人/);
});
