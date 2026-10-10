import { test } from "node:test";
import assert from "node:assert/strict";
import { buildConfirmation } from "./logic.mjs";

const booking = {
  registration: "EXAMPLE-A",
  name: "Example customer",
  date: "2026-11-02",
};

test("the same made-up booking always gives the same eight-character reference", () => {
  const confirmation = buildConfirmation(booking);
  assert.deepEqual(buildConfirmation({ ...booking }), confirmation);
  assert.match(confirmation.reference, /^MOT-[0-9A-F]{8}$/);
  assert.equal(
    buildConfirmation({ date: booking.date, name: booking.name, registration: booking.registration }).reference,
    confirmation.reference,
  );
});

test("changing any made-up booking field gives a different reference", () => {
  const reference = buildConfirmation(booking).reference;
  const alternatives = [
    { ...booking, registration: "EXAMPLE-B" },
    { ...booking, name: "Another example customer" },
    { ...booking, date: "2026-11-03" },
  ];
  const references = alternatives.map((alternative) => buildConfirmation(alternative).reference);
  assert.equal(new Set([reference, ...references]).size, 4);
});

test("confirmation text includes the booking, reference and made-up data notice", () => {
  const confirmation = buildConfirmation(booking);
  assert.equal(
    confirmation.text,
    `Booking confirmed for EXAMPLE-A (Example customer) on 2026-11-02. Reference: ${confirmation.reference}. All booking details and dates are made-up example data, not a real booking.`,
  );
});

test("building a confirmation leaves the booking unchanged", () => {
  const original = { ...booking };
  buildConfirmation(Object.freeze(original));
  assert.deepEqual(original, booking);
});

test("field boundaries remain distinct when values contain punctuation", () => {
  assert.notEqual(
    buildConfirmation({ ...booking, registration: "EXAMPLE|A", name: "B" }).reference,
    buildConfirmation({ ...booking, registration: "EXAMPLE", name: "A|B" }).reference,
  );
});
