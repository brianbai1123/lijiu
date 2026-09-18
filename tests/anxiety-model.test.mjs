import assert from "node:assert/strict";
import test from "node:test";

import {
  anxietyDispositionSummary,
  anxietyQuadrants,
} from "../src/data/anxiety-model.ts";

test("焦虑处置模型覆盖四种在乎 × 影响组合", () => {
  assert.equal(anxietyQuadrants.length, 4);

  const coordinates = anxietyQuadrants.map(
    ({ concern, influence }) => `${concern}-${influence}`,
  );
  assert.deepEqual(
    new Set(coordinates),
    new Set(["high-high", "high-low", "low-high", "low-low"]),
  );
});

test("每个象限都包含逻辑、问题、方法和提醒", () => {
  for (const quadrant of anxietyQuadrants) {
    assert.ok(quadrant.name);
    assert.ok(quadrant.definition);
    assert.ok(quadrant.logic);
    assert.ok(quadrant.problems.length >= 3);
    assert.ok(quadrant.responses.length >= 3);
    assert.ok(quadrant.reminder);
  }

  assert.match(anxietyDispositionSummary, /尽力/);
  assert.match(anxietyDispositionSummary, /接纳/);
  assert.match(anxietyDispositionSummary, /负责/);
  assert.match(anxietyDispositionSummary, /放下/);
});
