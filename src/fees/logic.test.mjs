import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateFees, EXAMPLE_FEES } from "./logic.mjs";

for (const [vehicleClass, testFee] of [
  ["car", 60],
  ["motorcycle", 30],
  ["minibus", 80],
]) {
  test(`calculateFees returns the example ${vehicleClass} breakdown`, () => {
    assert.deepEqual(calculateFees(vehicleClass), {
      testFee,
      discount: 0,
      total: testFee,
    });
    assert.deepEqual(calculateFees(vehicleClass, { retest: false }), {
      testFee,
      discount: 0,
      total: testFee,
    });
  });

  test(`calculateFees applies the example retest discount for ${vehicleClass}`, () => {
    assert.deepEqual(calculateFees(vehicleClass, { retest: true }), {
      testFee,
      discount: testFee / 2,
      total: testFee / 2,
    });
    assert.equal(EXAMPLE_FEES[vehicleClass], testFee);
    assert.equal(calculateFees(vehicleClass).discount, 0);
  });
}

test("calculateFees rejects unknown and inherited vehicle classes", () => {
  for (const vehicleClass of ["van", "", "toString", "__proto__", undefined, null]) {
    assert.throws(() => calculateFees(vehicleClass), {
      name: "RangeError",
      message: "Unknown vehicle class",
    });
  }
});
