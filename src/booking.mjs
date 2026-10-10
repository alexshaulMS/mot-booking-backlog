export function formatBookingMessage({ registration, name, date }) {
  return `Booking received for ${registration} (${name}) on ${date}.`;
}

export function isComplete({ registration, name, date }) {
  return Boolean(registration && name && date);
}
