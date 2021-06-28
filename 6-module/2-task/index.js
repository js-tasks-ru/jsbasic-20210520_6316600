import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  constructor(product) {
    this.name = product.name;
    this.price = product.price.toFixed(2);
    this.category = product.category;
    this.image = product.image;
    this.id = product.id;
    this.divCard = document.createElement("div");
    this.divCard.className = "card";
    this.divHolder = document.querySelector("#holder");
    this.divCard.insertAdjacentHTML(
      "afterbegin",
      `<div class="card__top">
                      <img src="/assets/images/products/${this.image}" class="card__image" alt="product">
                        <span class="card__price">€${this.price}</span>
                      </div>
                      <div class="card__body">
                        <div class="card__title">${this.name}</div>
                        <button type="button" class="card__button">
                          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                        </button>
                      </div>`
    );
    this.elem = this.divCard;
    this.cardButton = this.elem.querySelectorAll(".card__button");

    this.cardButton.forEach((button) =>
      button.addEventListener("click", function () {
        button.dispatchEvent(
          new CustomEvent("product-add", {
            detail: product.id,
            bubbles: true,
          })
        );
      })
    );
    this.elem.addEventListener("product-add", function (event) {
      console.log(event.detail);
    });
  }
}
