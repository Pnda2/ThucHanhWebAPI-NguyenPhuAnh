export class UpdateGiaBanDTO  {
    constructor({ MaGB, MaHang, Gia, DVTinh ,NgayBD ,NgayKT }) {

      this.MaHang = MaHang;
      this.Gia = Gia;
      this.DVTinh = DVTinh;
      this.NgayBD = NgayBD;
      this.NgayKT = NgayKT;
    }
  }