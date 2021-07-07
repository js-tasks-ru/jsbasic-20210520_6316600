export default class Cart {
  cartItems = []; 
  
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;

    this.cartNew = {
      product: {
        name: product.name, 
        price: product.price, 
        category: product.category, 
        image: product.image, 
        id: product.id, 
      },
      count: 1, 
    };

    this.foundObj = this.cartItems.find(
      (elems) => this.cartNew.product.id === elems.product.id
    );

    if (this.cartItems.length > 0) {
      if (this.foundObj !== undefined) {
        this.foundObj.count++;
      } else {
        this.cartItems.push(this.cartNew);
      }
    } else {
      this.cartItems.push(this.cartNew);
    }
    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    Array.prototype.remove = function (v) {
      if (this.indexOf(v) != -1) {
        this.splice(this.indexOf(v), 1);
        return true;
      }
      return false;
    };
    this.cartItems.map((elems) => {
      if (productId === elems.product.id) {
        if (amount === 1) {
          elems.count++;
        } else {
          elems.count--;
        }
        if (elems.count === 0) {
          this.cartItems.remove(elems);
        }
      }
    });
    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    if (this.cartItems.length > 0) {
      return false;
    }
    return true;
  }

  getTotalCount() {
    this.sum = this.cartItems.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.count;
    }, 0);
    return this.sum;
  }

  getTotalPrice() {
    this.allSum = this.cartItems
      .map((val) => val.product.price * val.count)
      .reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }, 0);
    return this.allSum;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
