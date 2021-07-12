export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.slider = document.createElement("div");
    this.slider.classList.add("slider");
    this.slider.insertAdjacentHTML(
      "beforeend",
      `<div class="slider__thumb" style="left: 75%;">
      <span class="slider__value">${value}</span>
    </div>
    <div class="slider__progress" style="width: 75%;"></div>
    <div class="slider__steps">
  </div>`
    );
    this.elem = this.slider;
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.thumb.ondragstart = () => false;

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


    this.thumb.addEventListener("pointerdown", function (event) {
      event.preventDefault();
      let progress = document.querySelector(".slider__progress");
      let thumb = document.querySelector(".slider__thumb");
      let slider = document.querySelector(".slider");

      thumb.style.position = "absolute";
      thumb.style.zIndex = 1000;

      function moveAt(leftPercents) {
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
      }

      function onMouseMove(event) {
        slider.classList.add("slider_dragging");

        event.preventDefault();

        document.querySelectorAll(".slider__step-active").forEach((item) => {
          item.classList.remove("slider__step-active");
        });

        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let leftPercents = leftRelative * 100;
        let segments = steps - 1;
        let approximateValue = leftRelative * segments;
        this.value = Math.round(approximateValue);
        slider.querySelector(".slider__value").innerHTML = this.value;
        slider
          .querySelector(".slider__steps")
          .children[`${this.value}`].classList.add("slider__step-active");

        moveAt(leftPercents);
      }
      document.addEventListener("pointermove", onMouseMove);

      document.addEventListener("pointerup", function () {
        slider.dispatchEvent(
          new CustomEvent("slider-change", {
            detail: this.value,
            bubbles: true,
          })
        );

        slider.classList.remove("slider_dragging");
        document.removeEventListener("pointermove", onMouseMove);
      });
      document.removeEventListener("pointerup", onMouseMove);
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
