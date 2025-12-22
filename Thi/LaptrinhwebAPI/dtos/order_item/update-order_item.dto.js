export class UpdateOderitemsDTO {
  constructor({ order_id, product_id, qty, unit_price }) {
    
    this.product_id = product_id;
    this.qty = qty;
    this.unit_price = unit_price;
  }
}
