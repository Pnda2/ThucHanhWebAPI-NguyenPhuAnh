export class GiaBanDTO  {
    constructor({ MaGB, MaHang, Gia, DVTinh ,NgayBD ,NgayKT }) {
      this.MaGB = MaGB;
      this.MaHang = MaHang;
      this.Gia = Gia;
      this.DVTinh = DVTinh;
      this.NgayBD = NgayBD ? new Date(NgayBD).toISOString().split('T')[0] : null;
      this.NgayKT = NgayKT ? new Date(NgayKT).toISOString().split('T')[0] : null;
    }
  }