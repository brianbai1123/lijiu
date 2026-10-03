import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { JSDOM } from "jsdom";

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

test("URL hash external store exposes initial selection and cleans up its listener", async () => {
  const moduleUrl = new URL("../src/lib/principle-hash.ts", import.meta.url);
  assert.ok(existsSync(moduleUrl), "principle hash external store must exist");

  const dom = new JSDOM("<!doctype html><html></html>", {
    url: "https://lijiu.test/#know-thyself",
  });
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: dom.window,
    writable: true,
  });

  try {
    const {
      getPrincipleHashSnapshot,
      principleIdFromHash,
      subscribeToHashChange,
    } = await import(moduleUrl);

    assert.equal(principleIdFromHash("#all"), null);
    assert.equal(principleIdFromHash(""), null);
    assert.equal(principleIdFromHash("#know-thyself"), "know-thyself");
    const initialSnapshot = getPrincipleHashSnapshot();
    assert.equal(initialSnapshot.id, "know-thyself");
    assert.equal(getPrincipleHashSnapshot(), initialSnapshot);

    let notifications = 0;
    const unsubscribe = subscribeToHashChange(() => notifications++);
    dom.window.dispatchEvent(new dom.window.HashChangeEvent("hashchange"));
    assert.equal(notifications, 1);
    unsubscribe();
    dom.window.dispatchEvent(new dom.window.HashChangeEvent("hashchange"));
    assert.equal(notifications, 1);
  } finally {
    dom.window.close();
    if (previousWindow === undefined) delete globalThis.window;
    else Object.defineProperty(globalThis, "window", previousWindow);
  }
});

test("Explorer derives hash selection without effect-driven setState", () => {
  assert.match(explorer, /subscribeToHashChange/);
  assert.match(explorer, /getPrincipleHashSnapshot/);
  assert.match(explorer, /React\.useSyncExternalStore\(/);
  assert.doesNotMatch(explorer, /location\.hash\.replace/);
  assert.doesNotMatch(
    explorer,
    /React\.useEffect\([\s\S]*?setSelectedId\([\s\S]*?\}, \[\]\)/,
  );
});

test("Bound pane omits the unused total parameter from its function signature", () => {
  const spreads = readFileSync(
    new URL("../src/app/designs/spreads/gallery.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    spreads,
    /function Bound\(\{ grouped, open, onOpen, index \}: PaneProps\)/,
  );
});
