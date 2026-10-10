import { validateRegistration } from "./logic.mjs";

export default function mount(root) {
  const document = root.ownerDocument;
  const form = document.getElementById("booking-form");
  const input = form.querySelector('[name="registration"]');
  const button = form.querySelector('button[type="submit"]');
  const error = document.createElement("span");
  error.id = "registration-error";
  error.setAttribute("aria-live", "polite");
  error.setAttribute("aria-atomic", "true");
  input.insertAdjacentElement("afterend", error);
  input.setAttribute(
    "aria-describedby",
    [input.getAttribute("aria-describedby"), error.id].filter(Boolean).join(" "),
  );

  function update(normalise = false) {
    const result = validateRegistration(input.value);
    if (normalise) input.value = result.registration;
    error.textContent = result.reason;
    input.setAttribute("aria-invalid", String(!result.valid));
    input.setCustomValidity(result.reason);
    button.disabled = !result.valid;
    return result.valid;
  }

  input.addEventListener("input", () => update());
  input.addEventListener("blur", () => update(true));
  form.addEventListener("reset", () => queueMicrotask(() => update()));
  form.addEventListener("submit", (event) => {
    if (!update(true)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      input.focus();
    }
  }, { capture: true });
  update();
}
