export class UpdateProductDTO {
  constructor({ id, name, price, stock, is_active }) {

    this.name = name;
    this.price = price;
    this.stock = stock;
    this.is_active = is_active;
  }
}