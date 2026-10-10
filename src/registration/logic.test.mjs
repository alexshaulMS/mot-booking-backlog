import { test } from "node:test";
import assert from "node:assert/strict";
import { validateRegistration } from "./logic.mjs";

// All registrations below are made-up examples.
for (const [description, value] of [
  ["valid", "AB12 CDE"],
  ["lower-case", "ab12 cde"],
  ["extra spaces", "  AB12   CDE  "],
  ["mixed whitespace", "\tab12 \t cde\n"],
]) {
  test(`validateRegistration normalises a ${description} registration`, () => {
    assert.deepEqual(validateRegistration(value), {
      registration: "AB12 CDE",
      valid: true,
      reason: "",
    });
  });
}

for (const [description, value] of [
  ["too short", "AB12 CD"],
  ["too long", "AB12 CDEF"],
  ["wrong characters", "AB12 C!E"],
  ["letters instead of digits", "ABCD EFG"],
  ["digits instead of letters", "1234 567"],
  ["missing space", "AB12CDE"],
  ["misplaced space", "AB 12CDE"],
]) {
  test(`validateRegistration rejects a registration with ${description}`, () => {
    const result = validateRegistration(value);
    assert.equal(result.registration, value);
    assert.equal(result.valid, false);
    assert.match(result.reason, /two letters, two digits, a space and three letters/);
  });
}

for (const value of ["", " \t\n "]) {
  test(`validateRegistration rejects empty input ${JSON.stringify(value)}`, () => {
    assert.deepEqual(validateRegistration(value), {
      registration: "",
      valid: false,
      reason: "Enter a registration number.",
    });
  });
}
