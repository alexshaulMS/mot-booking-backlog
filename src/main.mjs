import { features } from "./features.mjs";
import { formatBookingMessage, isComplete } from "./booking.mjs";

const form = document.getElementById("booking-form");
const status = document.getElementById("status");
const app = document.getElementById("app");

// Features get the #app element. They announce a finished booking with the
// "booking-submitted" event on document, with { registration, name, date } as detail.
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const booking = {
    registration: form.registration.value.trim(),
    name: form.name.value.trim(),
    date: form.date.value,
  };
  if (!isComplete(booking)) {
    status.textContent = "Please fill in every field.";
    return;
  }
  status.textContent = formatBookingMessage(booking);
  document.dispatchEvent(new CustomEvent("booking-submitted", { detail: booking }));
});

for (const [name, load] of Object.entries(features)) {
  if (!load) continue;
  try {
    const mod = await load();
    mod.default(app);
  } catch (error) {
    console.error(`Feature ${name} failed to load`, error);
  }
}
