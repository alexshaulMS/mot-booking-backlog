import { createCalendar } from "./logic.mjs";

export default function mount(root) {
  const document = root.ownerDocument;
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  heading.textContent = "Calendar";
  const note = document.createElement("p");
  note.textContent = "All booking data and dates are made-up examples.";
  const link = document.createElement("a");
  link.textContent = "Add to calendar";
  link.download = "example-mot-booking.ics";
  const status = document.createElement("p");
  status.setAttribute("role", "status");
  section.append(heading, note, link, status);
  section.hidden = true;
  root.append(section);
  let url;

  document.addEventListener("booking-submitted", ({ detail }) => {
    if (url) URL.revokeObjectURL(url);
    url = undefined;
    link.removeAttribute("href");
    link.hidden = true;
    section.hidden = false;
    try {
      const calendar = createCalendar(detail, {
        uid: `${crypto.randomUUID()}@mot-booking.example.invalid`,
        now: new Date(),
      });
      url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar;charset=utf-8" }));
      link.href = url;
      link.hidden = false;
      status.textContent = "";
    } catch {
      status.textContent = "Enter a valid example booking date to add it to your calendar.";
    }
  });
}
