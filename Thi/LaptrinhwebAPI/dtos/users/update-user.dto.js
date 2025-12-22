export class UpdateUserDTO {
  constructor(data) {

    this.name = data.name;
    this.email = data.email;
    this.role_id = data.role_id;
    this.password = data.password; // Có thể null/undefined nếu user không muốn đổi pass
  }
}