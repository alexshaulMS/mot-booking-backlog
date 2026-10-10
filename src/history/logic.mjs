const storageKey = "mot-booking-history";

function readHistory(storage) {
  return JSON.parse(storage.getItem(storageKey) ?? '{"nextId":1,"bookings":[]}');
}

export function listBookings(storage) {
  return readHistory(storage).bookings;
}

export function addBooking(storage, booking) {
  const { nextId: id, bookings } = readHistory(storage);
  const entry = { id, registration: booking.registration, name: booking.name, date: booking.date };
  storage.setItem(storageKey, JSON.stringify({ nextId: id + 1, bookings: [entry, ...bookings] }));
  return entry;
}

export function cancelBooking(storage, id) {
  const history = readHistory(storage);
  const bookings = history.bookings.filter((booking) => booking.id !== id);
  storage.setItem(storageKey, JSON.stringify({ ...history, bookings }));
  return bookings;
}
