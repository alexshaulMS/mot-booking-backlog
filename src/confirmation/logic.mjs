export function buildConfirmation({ registration, name, date }) {
  const booking = JSON.stringify([registration, name, date]);
  let hash = 2166136261;
  for (let index = 0; index < booking.length; index += 1) {
    hash = Math.imul(hash ^ booking.charCodeAt(index), 16777619) >>> 0;
  }
  const reference = `MOT-${hash.toString(16).toUpperCase().padStart(8, "0")}`;
  const text = `Booking confirmed for ${registration} (${name}) on ${date}. Reference: ${reference}. All booking details and dates are made-up example data, not a real booking.`;
  return { reference, text };
}
