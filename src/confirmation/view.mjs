import { buildConfirmation } from "./logic.mjs";

export default function mount(root) {
  const document = root.ownerDocument;
  const section = document.createElement("section");
  section.hidden = true;
  const heading = document.createElement("h2");
  heading.textContent = "Booking confirmation";
  const message = document.createElement("p");
  message.setAttribute("role", "status");
  const print = document.createElement("button");
  print.type = "button";
  print.textContent = "Print";
  print.addEventListener("click", () => document.defaultView.print());
  section.append(heading, message, print);
  root.append(section);

  document.addEventListener("booking-submitted", (event) => {
    message.textContent = buildConfirmation(event.detail).text;
    section.hidden = false;
  });
}
