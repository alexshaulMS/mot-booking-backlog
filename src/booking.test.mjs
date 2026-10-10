import { test } from "node:test";
import assert from "node:assert/strict";
import { formatBookingMessage, isComplete } from "./booking.mjs";

test("formatBookingMessage names the vehicle, person and date", () => {
  const message = formatBookingMessage({ registration: "AB12 CDE", name: "Sam", date: "2026-11-02" });
  assert.equal(message, "Booking received for AB12 CDE (Sam) on 2026-11-02.");
});

test("isComplete needs every field", () => {
  assert.equal(isComplete({ registration: "AB12 CDE", name: "Sam", date: "2026-11-02" }), true);
  assert.equal(isComplete({ registration: "", name: "Sam", date: "2026-11-02" }), false);
});
