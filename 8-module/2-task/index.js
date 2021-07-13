import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.addData();
  }
  updateFilter(filters) {
    // console.log(filters);
    Object.assign(this.filters, {...filters});

    this.product = this.products;

    if (this.filters.category) {
      this.product = this.product.filter(
        (elem) => elem.category === this.filters.category
      );
    }
    if (this.filters.maxSpiciness) {
      this.product = this.product.filter(
        (elem) => elem.spiciness <= this.filters.maxSpiciness
      );
    }
    if (this.filters.noNuts) {
      this.product = this.product.filter((elem) => elem.nuts != this.filters.noNuts);
    }
    if (this.filters.vegeterianOnly) {
      this.product = this.product.filter(
        (elem) => elem.vegeterian === this.filters.vegeterianOnly
      );
    }
    this.inner.innerHTML = "";
    this.product.forEach((element) => {
      this.inner.appendChild(new ProductCard(element).elem);
    });
  }
  addData() {
    this.grid = createElement('<div class="products-grid"></div>');
    this.inner = createElement('<div class="products-grid__inner"></div>');
    this.grid.append(this.inner);
    this.products.forEach((element) => {
      this.inner.append(new ProductCard(element).elem);
    });
    this.elem = this.grid;
  }
}
