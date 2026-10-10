import { test } from "node:test";
import assert from "node:assert/strict";
import { centres, filterCentres } from "./logic.mjs";

test("example data contains six fictional centres with names, towns and bay counts", () => {
  assert.equal(centres.length, 6);
  for (const centre of centres) {
    assert.equal(typeof centre.name, "string");
    assert.equal(typeof centre.town, "string");
    assert.ok(Number.isInteger(centre.bays) && centre.bays > 0);
  }
});

test("filterCentres matches part of a centre name", () => {
  assert.deepEqual(filterCentres("berry"), [centres[0]]);
});

test("filterCentres matches centres by town", () => {
  assert.deepEqual(filterCentres("Puddlehaven"), [centres[2], centres[3]]);
});

test("filterCentres returns no centres for an unmatched search", () => {
  assert.deepEqual(filterCentres("no such centre"), []);
});

test("filterCentres ignores case for names and towns", () => {
  assert.deepEqual(filterCentres("cLoUdBeRrY"), [centres[0]]);
  assert.deepEqual(filterCentres("bRiNdLeWiCk"), [centres[0], centres[1]]);
});

test("filterCentres returns all centres for an empty or omitted search", () => {
  assert.deepEqual(filterCentres(""), centres);
  assert.deepEqual(filterCentres(), centres);
});

test("filterCentres trims surrounding whitespace", () => {
  assert.deepEqual(filterCentres("  Moonfern  "), [centres[2]]);
  assert.deepEqual(filterCentres("   "), centres);
});

test("filterCentres does not change the example data", () => {
  const before = structuredClone(centres);
  const result = filterCentres("");
  result.pop();
  filterCentres("Moonfern");
  assert.deepEqual(centres, before);
});
