import { dateBounds, validateDate } from "./logic.mjs";

export default function mount(root, { now = () => new Date() } = {}) {
  const document = root.ownerDocument;
  const input = document.getElementById("date");
  const form = input.form;
  const help = document.createElement("p");
  help.id = "date-help";
  help.textContent = "Choose a weekday from tomorrow to 60 days ahead. All dates are made-up examples; bank holidays are not considered.";
  const error = document.createElement("p");
  error.id = "date-error";
  error.setAttribute("aria-live", "polite");
  input.after(help, error);
  const descriptions = input.getAttribute("aria-describedby");
  input.setAttribute("aria-describedby", [descriptions, help.id, error.id].filter(Boolean).join(" "));
  input.required = true;

  const validate = (showError = true) => {
    const current = now();
    const today = [
      String(current.getFullYear()).padStart(4, "0"),
      String(current.getMonth() + 1).padStart(2, "0"),
      String(current.getDate()).padStart(2, "0"),
    ].join("-");
    const { min, max } = dateBounds(today);
    input.min = min;
    input.max = max;
    const { valid, reason } = validateDate(input.value, today);
    input.setCustomValidity(reason);
    error.textContent = showError ? reason : "";
    input.setAttribute("aria-invalid", String(showError && !valid));
    return valid;
  };

  input.addEventListener("input", () => validate());
  input.addEventListener("change", () => validate());
  input.addEventListener("focus", () => validate(Boolean(input.value)));
  input.addEventListener("invalid", () => validate());
  form.addEventListener("submit", (event) => {
    if (!validate()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      input.reportValidity();
    }
  }, { capture: true });
  form.addEventListener("reset", () => queueMicrotask(() => validate(false)));
  validate(Boolean(input.value));
}
