import { addBooking, cancelBooking, listBookings } from "./logic.mjs";

export default function mount(root) {
  const document = root.ownerDocument;
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  heading.textContent = "My bookings";
  const notice = document.createElement("p");
  notice.textContent = "All bookings and dates shown here are made-up examples. Do not enter real names or registrations.";
  const message = document.createElement("p");
  message.setAttribute("role", "status");
  const list = document.createElement("ul");
  section.append(heading, notice, message, list);
  root.append(section);

  function render() {
    try {
      const bookings = listBookings(document.defaultView.localStorage);
      list.replaceChildren();
      message.textContent = bookings.length ? "" : "No bookings yet.";
      for (const booking of bookings) {
        const row = document.createElement("li");
        const details = document.createElement("span");
        details.textContent = `${booking.registration} (${booking.name}) — ${booking.date} (made-up example) `;
        const cancel = document.createElement("button");
        cancel.type = "button";
        cancel.textContent = "Cancel";
        cancel.setAttribute("aria-label", `Cancel booking for ${booking.registration} on ${booking.date}`);
        cancel.addEventListener("click", () => {
          try {
            cancelBooking(document.defaultView.localStorage, booking.id);
            render();
          } catch {
            message.textContent = "Unable to cancel this booking. Please check your browser storage settings.";
          }
        });
        row.append(details, cancel);
        list.append(row);
      }
    } catch {
      message.textContent = "Unable to load bookings. Please check your browser storage settings.";
    }
  }

  document.addEventListener("booking-submitted", (event) => {
    try {
      addBooking(document.defaultView.localStorage, event.detail);
      render();
    } catch {
      message.textContent = "Unable to save this booking. Please check your browser storage settings.";
    }
  });

  render();
}
