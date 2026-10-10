function escapeText(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function foldLine(line) {
  const encoder = new TextEncoder();
  let folded = "";
  let length = 0;
  for (const character of line) {
    const size = encoder.encode(character).length;
    if (length + size > 75) {
      folded += "\r\n ";
      length = 1;
    }
    folded += character;
    length += size;
  }
  return folded;
}

export function createCalendar({ registration, name, date }, { uid, now }) {
  const start = new Date(`${date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(start.getTime()) || start.toISOString().slice(0, 10) !== date) {
    throw new RangeError("Use a valid example booking date in YYYY-MM-DD format.");
  }
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  if (end.getUTCFullYear() > 9999) {
    throw new RangeError("The example booking must end within a four-digit year.");
  }
  const formatDate = (value) => value.toISOString().slice(0, 10).replace(/-/g, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MOT booking demo//Calendar//EN",
    "BEGIN:VEVENT",
    `UID:${escapeText(uid)}`,
    `DTSTAMP:${now.toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;VALUE=DATE:${formatDate(start)}`,
    `DTEND;VALUE=DATE:${formatDate(end)}`,
    `SUMMARY:${escapeText(`Example MOT test for ${registration}`)}`,
    `DESCRIPTION:${escapeText(`Booking for ${name}. All data and dates are made-up examples.`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].map(foldLine).join("\r\n") + "\r\n";
}
