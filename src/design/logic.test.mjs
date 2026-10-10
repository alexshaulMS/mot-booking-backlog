import { test } from "node:test";
import assert from "node:assert/strict";
import { hasAaContrast } from "./logic.mjs";

test("the design palette meets AA contrast for body and button text", () => {
  assert.equal(hasAaContrast("#172b3a", "#f4f7fa"), true);
  assert.equal(hasAaContrast("#172b3a", "#ffffff"), true);
  assert.equal(hasAaContrast("#17324d", "#f4f7fa"), true);
  assert.equal(hasAaContrast("#07524f", "#f4f7fa"), true);
  assert.equal(hasAaContrast("#ffffff", "#17324d"), true);
  assert.equal(hasAaContrast("#ffffff", "#0b635e"), true);
});

test("hasAaContrast rejects pairs below the normal-text AA threshold", () => {
  assert.equal(hasAaContrast("#777777", "#ffffff"), false);
  assert.equal(hasAaContrast("#000", "#fff"), true);
});

test("hasAaContrast rejects unsupported colour formats", () => {
  assert.throws(() => hasAaContrast("red", "#ffffff"), TypeError);
});
