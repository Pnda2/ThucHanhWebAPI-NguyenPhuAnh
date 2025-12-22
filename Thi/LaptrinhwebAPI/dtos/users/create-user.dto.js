export class CreateUserDTO {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.role_id = data.role_id;
    // Password sẽ được xử lý riêng (hash) trong Service, 
    // nhưng DTO này dùng để truyền từ Controller xuống Service
    this.password = data.password; 
  }
}