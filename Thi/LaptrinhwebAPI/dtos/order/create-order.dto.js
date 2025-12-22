export class CreateOrderDTO {
  constructor({ id, user_id, status, created_at }) {
    this.id = id;
    this.user_id = user_id;
    this.status = status;
    this.created_at = created_at;
  }
}
