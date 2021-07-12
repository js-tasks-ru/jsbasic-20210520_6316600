import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.addNewSlide();
    this.slider();
  }

  addNewSlide() {
    this.divCarousel = document.createElement("div");
    this.divCarousel.className = "carousel";
    this.divCarouselInner = document.createElement("div");
    this.divCarouselInner.className = "carousel__inner";
    this.divCarousel.append(this.divCarouselInner);
    this.divCarousel.insertAdjacentHTML(
      "afterbegin",
      `<div class="carousel__arrow carousel__arrow_right">
         <img src="/assets/images/icons/angle-icon.svg" alt="icon">
       </div>
       <div class="carousel__arrow carousel__arrow_left">
         <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
       </div>`
    );
    this.slides.forEach((key) =>
      this.divCarouselInner.insertAdjacentHTML(
        "beforeend",
        `<div class="carousel__slide" data-id="${key.id}">
        <img src="/assets/images/carousel/${
          key.image
        }" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${key.price.toFixed(2)}</span>
          <div class="carousel__title">${key.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`
      )
    );

    return (this.elem = this.divCarousel);
  }
  slider() {
    const righ = this.elem.querySelector(".carousel__arrow_right");
    const left = this.elem.querySelector(".carousel__arrow_left");
    const inner = this.elem.querySelector(".carousel__inner");
    const cardButton = this.elem.querySelectorAll(".carousel__button");
    let lengthSlide;

    let width = 0;
    left.style.display = "none";

    righ.addEventListener("click", () => {
      lengthSlide = (inner.children.length - 1) * inner.offsetWidth;
      width += inner.offsetWidth;
      inner.style.transform = `translateX(-${width}px)`;
      if (lengthSlide > width > 0) {
        left.style.display = "";
      } else if (width == lengthSlide) {
        righ.style.display = "none";
      }
    });

    left.addEventListener("click", () => {
      width -= inner.offsetWidth;
      inner.style.transform = `translateX(-${width}px)`;
      if (width == 0) {
        left.style.display = "none";
      } else if (lengthSlide > width) {
        righ.style.display = "";
      }
    });

    cardButton.forEach((button) =>
      button.addEventListener("click", function (event) {
        event.target.closest(".carousel__slide").dispatchEvent(
          new CustomEvent("product-add", {
            detail: event.target.closest(".carousel__slide").dataset.id,
            bubbles: true,
          })
        );
      })
    );
    document.addEventListener("product-add", function (event) {
      console.log(event.detail);
    });
  }
}
