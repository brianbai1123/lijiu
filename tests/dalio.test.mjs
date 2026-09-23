import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { dalioById } from "../src/data/dalio.ts";

const principlesSrc = readFileSync(
  new URL("../src/data/principles.ts", import.meta.url),
  "utf8",
);
const detailSrc = readFileSync(
  new URL("../src/components/principle-detail.tsx", import.meta.url),
  "utf8",
);

const ids = [...principlesSrc.matchAll(/^\s+id: "([^"]+)",/gm)].map((m) => m[1]);

test("35 张卡都有达利欧说，且排在背后逻辑与历史故事之间", () => {
  assert.equal(ids.length, 35);
  for (const id of ids) {
    const text = dalioById[id];
    assert.equal(typeof text, "string", id);
    assert.ok(text.trim().length > 80, id);
    assert.match(text, /达利欧/);
  }
  assert.equal(Object.keys(dalioById).length, 35);

  const logicAt = detailSrc.indexOf('title="背后逻辑"');
  const dalioAt = detailSrc.indexOf('title="达利欧说"');
  const storiesAt = detailSrc.indexOf('title="历史故事"');
  assert.ok(logicAt > 0 && dalioAt > logicAt && storiesAt > dalioAt);
});
