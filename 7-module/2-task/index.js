import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.classList.add("modal");
    this.modal.insertAdjacentHTML(
      "beforeend",
      `<div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>`
    );
    document.addEventListener("keydown", (event) => {
      event.code === "Escape" && this.close();
    });
    this.modal.querySelector(".modal__close").addEventListener("click", () => {
      this.close();
    });
  }
  open() {
    document.body.classList.add("is-modal-open");
    document.body.append(this.modal);
  }
  setTitle(text) {
    this.modal.querySelector(".modal__title").innerHTML = text;
  }
  setBody(node) {
    this.modal.querySelector(".modal__body").append(node);
  }
  close() {
    this.modal.remove();
    document.querySelector("body").classList.remove("is-modal-open");
  }
}
