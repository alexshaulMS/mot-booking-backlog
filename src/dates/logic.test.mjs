import { test } from "node:test";
import assert from "node:assert/strict";
import { dateBounds, validateDate } from "./logic.mjs";

// All dates below are made-up examples.
const today = "2026-10-05";

test("accepts a weekday, including tomorrow", () => {
  assert.deepEqual(validateDate("2026-10-06", today), { valid: true, reason: "" });
});

test("rejects Saturday and Sunday with a weekday reason", () => {
  for (const value of ["2026-10-10", "2026-10-11"]) {
    assert.deepEqual(validateDate(value, today), {
      valid: false,
      reason: "Choose a weekday (Monday to Friday).",
    });
  }
});

test("rejects today, past dates and the 61st day with a range reason", () => {
  for (const value of [today, "2026-10-02", "2026-12-05"]) {
    assert.deepEqual(validateDate(value, today), {
      valid: false,
      reason: "Choose a date from tomorrow to 60 days ahead.",
    });
  }
});

test("accepts the 60th day when it is a weekday", () => {
  assert.deepEqual(validateDate("2026-12-04", today), { valid: true, reason: "" });
});

test("rejects weekends even on the range boundaries", () => {
  assert.equal(validateDate("2026-10-10", "2026-10-09").valid, false);
  assert.equal(validateDate("2026-12-05", "2026-10-06").valid, false);
});

test("rejects an empty value with a reason", () => {
  assert.deepEqual(validateDate("", today), { valid: false, reason: "Choose a test date." });
});

test("rejects malformed and impossible dates", () => {
  for (const value of ["not a date", "2026-10-6", "2026-02-30", "2026-13-01"]) {
    assert.deepEqual(validateDate(value, today), {
      valid: false,
      reason: "Choose a valid test date.",
    });
  }
});

test("calculates calendar-day bounds across month, year and leap-day boundaries", () => {
  assert.deepEqual(dateBounds(today), { min: "2026-10-06", max: "2026-12-04" });
  assert.deepEqual(dateBounds("2026-12-31"), { min: "2027-01-01", max: "2027-03-01" });
  assert.deepEqual(dateBounds("2028-02-28"), { min: "2028-02-29", max: "2028-04-28" });
});

test("rejects an invalid injected today", () => {
  assert.throws(() => dateBounds("2026-02-30"), RangeError);
});
