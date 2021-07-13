import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.menu();
    this.scrolling();
  }
  menu() {
    this.ribbon = document.createElement("div");
    this.ribbon.className = "ribbon";
    this.ribbon.insertAdjacentHTML(
      "afterbegin",
      `<button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </button>
          <nav class="ribbon__inner">
          </nav>
          <button class="ribbon__arrow ribbon__arrow_right  ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </button>`
    );
    this.ribbonInner = this.ribbon.querySelector(".ribbon__inner");
    this.categories.forEach((key) =>
      this.ribbonInner.insertAdjacentHTML(
        "beforeend",
        `<a href="#" class="ribbon__item" data-id=${key.id}>${key.name}</a>`
      )
    );
    this.elem = this.ribbon;
  }
  scrolling() {
    this.ribbon
      .querySelector(".ribbon__arrow_left")
      .addEventListener("click", () => {
        this.ribbonInner.scrollBy(-350, 0);
      });
    this.ribbon
      .querySelector(".ribbon__arrow_right")
      .addEventListener("click", () => {
        this.ribbonInner.scrollBy(350, 0);
      });

    this.ribbonInner.addEventListener("scroll", function () {
      let scrollWidth = document.querySelector(".ribbon__inner").scrollWidth;
      let scrollLeft = document.querySelector(".ribbon__inner").scrollLeft;
      let clientWidth = document.querySelector(".ribbon__inner").clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft > 0) {
        document
          .querySelector(".ribbon__arrow_left")
          .classList.add("ribbon__arrow_visible");
      } else if (scrollLeft === 0) {
        document
          .querySelector(".ribbon__arrow_left")
          .classList.remove("ribbon__arrow_visible");
        document
          .querySelector(".ribbon__arrow_right")
          .classList.add("ribbon__arrow_visible");
      }

      scrollRight < 1
        ? document
            .querySelector(".ribbon__arrow_right")
            .classList.remove("ribbon__arrow_visible")
        : document
            .querySelector(".ribbon__arrow_right")
            .classList.add("ribbon__arrow_visible");

    });
    this.ribbonInner.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelectorAll(".ribbon__item_active").forEach((item) => {
        item.classList.remove("ribbon__item_active");
      });

      event.target.dispatchEvent(
        new CustomEvent("ribbon-select", {
          detail: event.target.dataset.id,
          bubbles: true,
        })
      );
    });
    document.addEventListener("ribbon-select", function (event) {
      console.log(event.detail);
    });
  }
}
