import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { groupByCategory } from "../src/lib/group-by-category.ts";

const explorer = readFileSync(
  new URL("../src/components/explorer.tsx", import.meta.url),
  "utf8",
);
const principlesSrc = readFileSync(
  new URL("../src/data/principles.ts", import.meta.url),
  "utf8",
);

const domains = [
  "cognition",
  "character",
  "relations",
  "action",
  "risk",
  "adversity",
  "meaning",
];

test("工作台按领域分组，空组丢弃、顺序跟目录走", () => {
  const cats = domains.map((id) => ({ id }));
  const list = [
    { id: "a", category: "meaning" },
    { id: "b", category: "cognition" },
    { id: "c", category: "cognition" },
  ];
  const groups = groupByCategory(cats, list);
  assert.deepEqual(
    groups.map((g) => [g.category.id, g.items.map((i) => i.id)]),
    [
      ["cognition", ["b", "c"]],
      ["meaning", ["a"]],
    ],
  );
});

test("原则数据覆盖七个领域共 35 条", () => {
  const assigned = [...principlesSrc.matchAll(/^\s+category: "(\w+)",/gm)].map(
    (m) => m[1],
  );
  assert.equal(assigned.length, 35);
  assert.deepEqual([...new Set(assigned)], domains);
});

test("首页 Explorer 用工作台内嵌全文，不再弹层", () => {
  assert.match(explorer, /WorkspaceSpread/);
  assert.doesNotMatch(explorer, /PrincipleCard/);
  assert.doesNotMatch(explorer, /principle-grid/);
  assert.doesNotMatch(explorer, /from "@\/components\/ui\/dialog"/);
  assert.doesNotMatch(explorer, /展开完整解读/);

  const workspace = readFileSync(
    new URL("../src/components/workspace-spread.tsx", import.meta.url),
    "utf8",
  );
  assert.match(workspace, /PrincipleDetail/);
  assert.match(workspace, /showLead=\{false\}/);
  assert.doesNotMatch(workspace, /展开完整解读/);
});
