import { test } from "node:test";
import assert from "node:assert/strict";
import { addBooking, cancelBooking, listBookings } from "./logic.mjs";

function memoryStorage() {
  const items = new Map();
  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, String(value)),
  };
}

// All names, registrations and dates below are made-up examples.
const example = { registration: "DEMO 1", name: "Example Person", date: "2026-11-02" };

test("listBookings returns an empty list for unused storage", () => {
  assert.deepEqual(listBookings(memoryStorage()), []);
});

test("addBooking persists the booking without changing the input", () => {
  const storage = memoryStorage();
  const booking = Object.freeze({ ...example });
  const added = addBooking(storage, booking);
  assert.deepEqual(added, { id: 1, ...example });
  assert.deepEqual(listBookings(storage), [added]);
});

test("listBookings returns newest additions first, not booking date order", () => {
  const storage = memoryStorage();
  const first = addBooking(storage, example);
  const second = addBooking(storage, { ...example, date: "2026-10-01" });
  assert.deepEqual(listBookings(storage), [second, first]);
});

test("cancelBooking removes only the selected booking, including duplicates", () => {
  const storage = memoryStorage();
  const first = addBooking(storage, example);
  const second = addBooking(storage, example);
  assert.notEqual(first.id, second.id);
  assert.deepEqual(cancelBooking(storage, first.id), [second]);
  assert.deepEqual(listBookings(storage), [second]);
  cancelBooking(storage, second.id);
  assert.deepEqual(listBookings(storage), []);
});

test("cancelling an unknown booking leaves the list unchanged", () => {
  const storage = memoryStorage();
  assert.deepEqual(cancelBooking(storage, 99), []);
  const added = addBooking(storage, example);
  assert.deepEqual(cancelBooking(storage, 99), [added]);
  assert.deepEqual(listBookings(storage), [added]);
});

test("cancelled IDs are not reused, so stale cancellation cannot remove a new booking", () => {
  const storage = memoryStorage();
  const first = addBooking(storage, example);
  cancelBooking(storage, first.id);
  const second = addBooking(storage, example);
  assert.notEqual(second.id, first.id);
  cancelBooking(storage, first.id);
  assert.deepEqual(listBookings(storage), [second]);
});

test("changing a returned list does not change stored bookings", () => {
  const storage = memoryStorage();
  const added = addBooking(storage, example);
  const bookings = listBookings(storage);
  bookings[0].name = "Another Example";
  bookings.pop();
  assert.deepEqual(listBookings(storage), [added]);
});
