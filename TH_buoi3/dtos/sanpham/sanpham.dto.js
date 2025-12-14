// DTO for SanPham
// tao 1 class SanPhamDTO
export class SanPhamDTO {
  constructor({ Ma, Ten, DonGia, MaDanhMuc}) {
    this.Ma = Ma;
    this.Ten = Ten;
    this.DonGia = DonGia;
    this.MaDanhMuc = MaDanhMuc;
  }
}
