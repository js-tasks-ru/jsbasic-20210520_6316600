/* eslint-disable no-unused-expressions */
import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";
import ProductCard from "../../6-module/2-task/index.js";
export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let cartNew = new ProductCard(product);
    cartNew.count = 1;

    let foundObj = this.cartItems.find(
      (elems) => cartNew.product.id === elems.product.id
    );

    foundObj !== undefined ? foundObj.count++ : this.cartItems.push(cartNew);

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    let elem;
    this.cartItems.forEach((elems, index) => {
      if (productId === elems.product.id) {
        if (amount === 1) {
          ++elems.count;
        } else {
          --elems.count;
        }
        elem = elems;

        elems.count === 0 && this.cartItems.splice(index, 1);
      }

      if (this.cartItems.length === 0) {
        return this.modal.close();
      }
    });
    this.onProductUpdate(this.cartItems, elem);
  }

  isEmpty() {
    if (this.cartItems.length > 0) {
      return false;
    }
    return true;
  }

  getTotalCount() {
    let sum = this.cartItems.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.count;
    }, 0);
    return sum;
  }

  getTotalPrice(product) {
    let allSum = (product || this.cartItems)
      .map((val) => val.product.price * val.count)
      .reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }, 0);
    return allSum;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.div = document.createElement("div");
    this.div.append(this.renderOrderForm());
    this.cartItems.forEach((product) =>
      this.div.prepend(this.renderProduct(product.product, product.count))
    );
    this.modal.setBody(this.div);
    this.modal.open();
    document.querySelectorAll(".cart-counter [type=button]").forEach((ele) =>
      ele.addEventListener("click", (event) => {
        let id = event.target.closest(".cart-product").dataset.productId;
        if (
          event.currentTarget.classList.contains("cart-counter__button_plus")
        ) {
          this.updateProductCount(id, 1);
        } else if (
          event.currentTarget.classList.contains("cart-counter__button_minus")
        ) {
          this.updateProductCount(id, 0);
        }
      })
    );
    this.forma = document.querySelector(".cart-form");
    this.forma.addEventListener("submit", (event) => {
      this.onSubmit(event);
    });
    let button = document.querySelector(".cart-buttons [type=submit]");
    function promiseClick(button) {
      return new Promise((resolve, reject) => {
        button.addEventListener(
          "click",
          (event) => {
            resolve(event);
          },
          { once: true }
        );
      });
    }

    promiseClick(button).then((event) => console.log(event));
  }

  onProductUpdate(cartItem, product) {
    if (document.body.classList.contains("is-modal-open")) {
      let modalBody = document.querySelector(".modal");

      let productCount = modalBody.querySelector(
        `[data-product-id="${product.product.id}"] .cart-counter__count`
      );

      let productPrice = modalBody.querySelector(
        `[data-product-id="${product.product.id}"] .cart-product__price`
      );

      let infoPrice = document.querySelector(`.cart-buttons__info-price`);

      if (product.count === 0) {
        this.div
          .querySelector(`[data-product-id="${product.product.id}"]`)
          .remove();
      }

      productCount.innerHTML = product.count;

      productPrice.innerHTML = `€${this.getTotalPrice([product]).toFixed(2)}`;

      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
    this.cartIcon.update(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    document
      .querySelector(".cart-buttons [type=submit]")
      .classList.add("is-loading");
    let response = await fetch("https://httpbin.org/post", {
      method: "POST",
      body: new FormData(this.forma),
    });
    if (response.ok) {
      this.modal.setTitle("Success!");
      this.cartItems = [];
      this.cartIcon.update(this);
      this.div.innerHTML = `<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`;
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
