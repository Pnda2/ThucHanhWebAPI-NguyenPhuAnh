export class UpdateOrderDTO {
  constructor({ id, user_id, status, created_at }) {

    this.user_id = user_id;
    this.status = status;
    this.created_at = created_at;
  }
}
