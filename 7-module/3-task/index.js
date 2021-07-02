export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.slider = document.createElement("div");
    this.slider.classList.add("slider");
    this.slider.insertAdjacentHTML(
      "beforeend",
      `<div class="slider__thumb" style="left: 0%;">
      <span class="slider__value">${value}</span>
    </div>
    <div class="slider__progress" style="width: 0%;"></div>
    <div class="slider__steps">
  </div>`
    );
    this.elem = this.slider;
    this.addSpan(steps);

    this.slider.addEventListener("click", (event) => {
      document.querySelectorAll(".slider__step-active").forEach((item) => {
        item.classList.remove("slider__step-active");
      });
      let leftRelative = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.getBoundingClientRect().width;
      let segments = steps - 1;
      let value = Math.round(leftRelative * segments);
      this.elem.querySelector(".slider__value").innerHTML = value;
      let valuePercents = (value / segments) * 100;
      
      this.elem
        .querySelector(".slider__thumb")
        .style.left = `${valuePercents}%`;

      this.elem
        .querySelector( ".slider__progress")
        .style.width = `${valuePercents}%`;

      this.elem
        .querySelector(".slider__steps")
        .children[`${value}`].classList.add("slider__step-active");

      this.slider.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: value,
          bubbles: true,
        })
      );
    });
  }
  addSpan(steps) {
    let i = 0;
    while (i < steps) {
      this.elem.querySelector(".slider__steps").innerHTML += "<span></span>";
      i++;
    }
    this.elem
      .querySelector(".slider__steps")
      .children[0].classList.add("slider__step-active");
  }
}
