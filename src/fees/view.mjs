import { calculateFees, EXAMPLE_FEES } from "./logic.mjs";

export default function mount(root) {
  const section = document.createElement("section");
  section.setAttribute("aria-labelledby", "fees-heading");
  section.innerHTML = `
    <h2 id="fees-heading">Example fee breakdown</h2>
    <p>All fees and the 50% retest discount are made-up examples only, not real prices.</p>
    <label for="fees-vehicle-class">Vehicle class</label>
    <select id="fees-vehicle-class"></select>
    <label for="fees-retest">
      <input id="fees-retest" type="checkbox"> Apply example retest discount (50%)
    </label>
    <div aria-live="polite" aria-atomic="true">
      <dl>
        <dt>Example test fee</dt><dd data-fee="testFee"></dd>
        <dt>Example retest discount</dt><dd data-fee="discount"></dd>
        <dt>Example total to pay</dt><dd data-fee="total"></dd>
      </dl>
    </div>
  `;

  const vehicleClass = section.querySelector("select");
  const retest = section.querySelector("input");
  for (const name of Object.keys(EXAMPLE_FEES)) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name[0].toUpperCase() + name.slice(1);
    vehicleClass.append(option);
  }

  const currency = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });
  function render() {
    const breakdown = calculateFees(vehicleClass.value, { retest: retest.checked });
    for (const [name, amount] of Object.entries(breakdown)) {
      section.querySelector(`[data-fee="${name}"]`).textContent =
        name === "discount" && amount > 0 ? `−${currency.format(amount)}` : currency.format(amount);
    }
  }

  vehicleClass.addEventListener("change", render);
  retest.addEventListener("change", render);
  render();
  root.append(section);
}
