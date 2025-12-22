export class UserDTO {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role_id = user.role_id;
    this.created_at = user.created_at;
  }
}