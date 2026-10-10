import { test } from "node:test";
import assert from "node:assert/strict";
import { createCalendar } from "./logic.mjs";

// All bookings and dates in these tests are made-up examples.
const booking = { registration: "EXAMPLE", name: "Example customer", date: "2026-11-02" };
const environment = { uid: "example-booking@example.invalid", now: new Date("2026-10-01T12:34:56Z") };

test("creates a complete all-day iCalendar event with CRLF endings", () => {
  const calendar = createCalendar(booking, environment);
  const lines = calendar.replace(/\r\n /g, "").split("\r\n");
  for (const line of [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MOT booking demo//Calendar//EN",
    "BEGIN:VEVENT",
    "UID:example-booking@example.invalid",
    "DTSTAMP:20261001T123456Z",
    "DTSTART;VALUE=DATE:20261102",
    "DTEND;VALUE=DATE:20261103",
    "SUMMARY:Example MOT test for EXAMPLE",
    "DESCRIPTION:Booking for Example customer. All data and dates are made-up examples.",
    "END:VEVENT",
    "END:VCALENDAR",
  ]) {
    assert.ok(lines.includes(line), line);
  }
  assert.ok(calendar.endsWith("\r\n"));
  assert.equal(calendar.replace(/\r\n/g, "").includes("\n"), false);
  assert.equal(calendar.replace(/\r\n/g, "").includes("\r"), false);
  assert.equal(createCalendar(booking, environment), calendar);
});

test("escapes commas, semicolons, backslashes and newlines without injecting properties", () => {
  const calendar = createCalendar({
    ...booking,
    registration: "EX,AMPLE;\\",
    name: "Example\r\nATTENDEE:fake@example.invalid\nOther\rLine",
  }, environment).replace(/\r\n /g, "");
  assert.ok(calendar.includes("SUMMARY:Example MOT test for EX\\,AMPLE\\;\\\\\r\n"));
  assert.ok(calendar.includes("Example\\nATTENDEE:fake@example.invalid\\nOther\\nLine"));
  assert.equal(calendar.includes("\r\nATTENDEE:"), false);
});

test("uses calendar dates with an exclusive next-day end across month and year boundaries", () => {
  for (const [date, start, end] of [
    ["2028-02-29", "20280229", "20280301"],
    ["2026-12-31", "20261231", "20270101"],
  ]) {
    const calendar = createCalendar({ ...booking, date }, environment);
    assert.ok(calendar.includes(`DTSTART;VALUE=DATE:${start}\r\n`));
    assert.ok(calendar.includes(`DTEND;VALUE=DATE:${end}\r\n`));
  }
});

test("rejects invalid or non-ISO booking dates", () => {
  for (const date of ["", "02/11/2026", "2026-2-01", "2026-02-30", "2026-13-01", "9999-12-31"]) {
    assert.throws(() => createCalendar({ ...booking, date }, environment), RangeError);
  }
});

test("folds long Unicode text into lines of at most 75 UTF-8 octets", () => {
  const name = "Example é🚗".repeat(20);
  const calendar = createCalendar({ ...booking, name }, environment);
  for (const line of calendar.split("\r\n")) {
    assert.ok(Buffer.byteLength(line, "utf8") <= 75);
  }
  assert.ok(calendar.replace(/\r\n /g, "").includes(`DESCRIPTION:Booking for ${name}.`));
});
