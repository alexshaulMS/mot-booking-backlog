import { filterCentres } from "./logic.mjs";

export default function mount(root) {
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  heading.textContent = "Find a test centre";

  const note = document.createElement("p");
  note.textContent = "Made-up example data: all centres, towns and bay counts are fictional.";

  const label = document.createElement("label");
  label.htmlFor = "centres-search";
  label.textContent = "Search example centres by town or name";

  const search = document.createElement("input");
  search.id = "centres-search";
  search.type = "search";

  const status = document.createElement("p");
  status.setAttribute("role", "status");
  const results = document.createElement("ul");

  function render() {
    const matches = filterCentres(search.value);
    results.replaceChildren();
    for (const centre of matches) {
      const item = document.createElement("li");
      item.textContent = `${centre.name} — ${centre.town} — ${centre.bays} ${centre.bays === 1 ? "bay" : "bays"} (fictional example)`;
      results.append(item);
    }
    results.hidden = matches.length === 0;
    status.textContent = matches.length === 0
      ? "No example test centres match your search."
      : `${matches.length} example test ${matches.length === 1 ? "centre" : "centres"} found.`;
  }

  search.addEventListener("input", render);
  section.append(heading, note, label, search, status, results);
  root.append(section);
  render();
}
