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

const model = quadrantModels["occams-razor"];
const stem = stemSections["occams-razor"];
const byId = new Map(model.quadrants.map((q) => [q.id, q]));

test("第五卡弹窗主 check 不换", () => {
  assert.equal(
    checks["occams-razor"].check,
    "给理论装太多后门，事实永远抓不住它；不会输的解释，也赢不了真相。",
  );
  assert.equal(checks["occams-razor"].trigger, "解释变复杂时");
});

test("最难的事：删掉一个并没有错的东西", () => {
  assert.match(principlesSrc, /title: "最难的事：删掉一个并没有错的东西"/);
  assert.match(principlesSrc, /title: "数补丁，不数字数"/);
  assert.match(principlesSrc, /事实只砍错的，砍不掉多余的/);
  assert.match(principlesSrc, /删它不像纠错，像自伤/);
  assert.match(principlesSrc, /没有死法的解释，也没有活着的资格/);
});

test("第一性原理：内容等于排除掉的东西", () => {
  assert.match(principlesSrc, /第一性原理：一个说法的内容，等于它排除掉的东西/);
  assert.match(principlesSrc, /内容归零的说法/);
  assert.match(principlesSrc, /剃刀保的不是简单，是内容/);
});

test("四象限四格与假出路", () => {
  assert.match(model.heading, /背了多少 × 错了疼不疼/);
  assert.deepEqual(
    model.quadrants.map((q) => q.name),
    ["赤膊上秤", "背包过河", "缩手藏袖", "浑身暗门"],
  );
  assert.deepEqual(
    new Set(model.quadrants.map((q) => `${q.y}-${q.x}`)),
    new Set(["high-high", "high-low", "low-high", "low-low"]),
  );
  assert.match(byId.get("sleeves").reminder, /它不简单，它只是短/);
  assert.match(byId.get("trapdoors").reminder, /没上过场/);
  assert.match(model.transitions.join("\n"), /最该警惕的假出路/);
  assert.match(model.summary, /横轴管成本，纵轴管资格/);
});

test("第五卡 STEM 四块避开前四卡", () => {
  assert.deepEqual(
    stem.blocks.map((b) => b.id),
    ["mdl", "occam-factor", "collinearity", "deletion-test"],
  );
  assert.match(stem.blocks[0].formula, /L\(H, D\)/);
  assert.match(stem.blocks[1].close, /押满全场/);
  assert.match(stem.blocks[2].formula, /VIF/);
  assert.match(stem.blocks[3].formula, /deps\(x\) = 0/);
});

test("故事替换与史料自查", () => {
  assert.match(enrichmentsSrc, /爱因斯坦删掉一个还能用的东西/);
  assert.match(enrichmentsSrc, /N 射线：为每一次测不到加一个条件/);
  assert.match(enrichmentsSrc, /开普勒放下圆/);
  assert.doesNotMatch(enrichmentsSrc, /哥白尼：更少的圆/);
  assert.doesNotMatch(enrichmentsSrc, /瘟疫归因女巫/);
  assert.match(enrichmentsSrc, /史料自查：这几则我改过取法/);
  assert.match(enrichmentsSrc, /没有哪一步是错的，错的是那条路/);
  assert.match(principlesSrc, /火神星/);
  assert.match(principlesSrc, /它挑愿意被判死的/);
});
