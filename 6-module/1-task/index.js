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
    this.item = rows
      .map(
        (key) =>
          `<tr> <td>${key.name} <td>${key.age} <td>${key.salary} <td>${key.city} <td><button>X</button>`
      )
      .join(" ");
    // this.item = rows.map((key) =>`<tr> <td>${key.name}<td/> <td>${key.age}<td/> <td>${key.salary}<td/> <td>${key.city}<td/> <td><button>X</button><tr/>`).join(" ");
    this.div.insertAdjacentHTML("beforeEnd", `<table><tbody>${this.item}`);
    // this.div.insertAdjacentHTML('beforeEnd', `<table><tbody>${this.item}<table/><tbody/>`);
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
