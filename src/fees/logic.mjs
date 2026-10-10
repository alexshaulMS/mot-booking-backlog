export const EXAMPLE_FEES = Object.freeze({
  car: 60,
  motorcycle: 30,
  minibus: 80,
});

export function calculateFees(vehicleClass, { retest = false } = {}) {
  if (!Object.hasOwn(EXAMPLE_FEES, vehicleClass)) {
    throw new RangeError("Unknown vehicle class");
  }

  const testFee = EXAMPLE_FEES[vehicleClass];
  const discount = retest ? testFee * 0.5 : 0;
  return { testFee, discount, total: testFee - discount };
}
