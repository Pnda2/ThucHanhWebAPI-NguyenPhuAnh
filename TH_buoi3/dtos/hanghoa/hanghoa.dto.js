// DTO for Hanghoa
// tao 1 class HanghoaDTO
export class HangHoaDTO {
  constructor({ MaHang, MaLoai, TenHang, SoLuong, SoLuongCon, Gia }) {
    this.MaHang = MaHang;
    this.MaLoai = MaLoai;
    this.TenHang = TenHang;
    this.SoLuong = SoLuong;
    this.SoLuongCon = SoLuongCon;

    // Nếu database trả về Gia thì lấy, không thì thôi
    if (Gia !== undefined && Gia !== null) {
      this.Gia = Gia;
    }
  }
}
