function initCarousel() {
  const righ = document.querySelector(".carousel__arrow_right");
  const left = document.querySelector(".carousel__arrow_left");
  const inner = document.querySelector(".carousel__inner");
  const lengthSlide = (inner.children.length - 1) * inner.offsetWidth;
  let width = 0;
  left.style.display = "none";

  righ.addEventListener("click", () => {
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
}
