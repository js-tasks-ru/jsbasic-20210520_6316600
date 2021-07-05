import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
    this.initialTopCoord =
      this.elem.getBoundingClientRect().top + window.pageYOffset;
    this.ser =
      document.querySelector(".container").getBoundingClientRect().right + 20;
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetWidth) {
      if (window.pageYOffset > this.initialTopCoord) {
        let leftIndent =
          Math.min(
            document.querySelector(".container").getBoundingClientRect().right +
              20,
            Math.round(
              document.documentElement.clientWidth - this.elem.offsetWidth - 10
            )
          ) + "px";
        console.log(leftIndent);
        Object.assign(this.elem.style, {
          position: "fixed",
          top: "50px",
          zIndex: 1e3,
          right: "10px",
          left: leftIndent,
        });
        console.log("#1");
      } 
      if (window.pageYOffset < this.initialTopCoord) {
        Object.assign(this.elem.style, {
          position: "",
          top: "",
          left: "",
          zIndex: "",
        });
        console.log("#2");
      }
      if (document.documentElement.clientWidth <= 767) {
        Object.assign(this.elem.style, {
          position: "",
          top: "",
          left: "",
          zIndex: "",
        });
        console.log(getComputedStyle(this.elem).position);
      }
    }
  }
}
