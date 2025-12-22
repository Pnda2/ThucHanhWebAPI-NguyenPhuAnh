export class CreateProductDTO {
  constructor({ id, name, price, stock, is_active }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.is_active = is_active;
  }
}
