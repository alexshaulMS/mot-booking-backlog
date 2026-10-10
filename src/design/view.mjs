export default function mount(root) {
  const doc = root.ownerDocument;

  if (!doc.querySelector("link[data-design-stylesheet]")) {
    const stylesheet = doc.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = new URL("./design.css", import.meta.url).href;
    stylesheet.dataset.designStylesheet = "";
    doc.head.append(stylesheet);
  }

  const form = doc.getElementById("booking-form");
  if (form && !doc.querySelector('a[href="#booking-form"]')) {
    const skipLink = doc.createElement("a");
    skipLink.href = "#booking-form";
    skipLink.textContent = "Skip to booking form";
    form.tabIndex = -1;
    form.parentNode.insertBefore(skipLink, form);
  }
}
