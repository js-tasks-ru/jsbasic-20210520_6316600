/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.div = document.createElement("div");
    this.table = document.createElement("table");
    this.tbody = document.createElement("tbody");
    this.table.append(this.tbody);
    this.div.append(this.table);
    this.item = rows
      .map(
        (key) =>
          `<tr><td>${key.name}</td> <td>${key.age}</td> <td>${key.salary}</td> <td>${key.city}</td> <td><button>X</button></td></tr>`
      )
      .join(" ");
    this.div.firstChild.lastChild.insertAdjacentHTML("afterbegin", `${this.item}`);
    this.elem = this.div;
    this.elem.addEventListener("click", this.onClick);
  }
  onClick(event) {
    if (event.target.tagName !== "BUTTON") {
      return;
    }
    event.target.closest("tr").remove();
  }
}
