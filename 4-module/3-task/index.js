function highlight(table) {
  for (let tr of table.querySelectorAll("tr")) {
    for (let td of tr.children) {
      !td.hasAttribute("data-available")
        ? (tr.hidden = true)
        : td.getAttribute("data-available") === "true"
        ? tr.classList.add("available")
        : td.getAttribute("data-available") === "false"
        ? tr.classList.add("unavailable")
        : false;
        td.textContent === "m"
        ? tr.classList.add("male")
        : td.textContent === "f"
        ? tr.classList.add("female")
        : +td.textContent < 18
        ? (tr.style = "text-decoration: line-through")
        : false;
    }
  }
}
