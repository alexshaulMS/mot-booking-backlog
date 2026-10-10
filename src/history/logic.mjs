const storageKey = "mot-booking-history";

export function listBookings(storage) {
  return JSON.parse(storage.getItem(storageKey) ?? "[]");
}

export function addBooking(storage, booking) {
  const bookings = listBookings(storage);
  const id = bookings.reduce((highest, entry) => Math.max(highest, entry.id), 0) + 1;
  const entry = { id, registration: booking.registration, name: booking.name, date: booking.date };
  storage.setItem(storageKey, JSON.stringify([entry, ...bookings]));
  return entry;
}

export function cancelBooking(storage, id) {
  const bookings = listBookings(storage).filter((booking) => booking.id !== id);
  storage.setItem(storageKey, JSON.stringify(bookings));
  return bookings;
}
