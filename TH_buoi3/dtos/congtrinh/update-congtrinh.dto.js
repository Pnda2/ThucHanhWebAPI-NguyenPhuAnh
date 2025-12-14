export class UpdateCongTrinhDTO  {
  constructor({ MACT, TENCT, DIADIEM, NGAYCAPGP, NGAYKC }) {
    
    this.TENCT = TENCT;
    this.DIADIEM = DIADIEM;
    this.NGAYCAPGP = NGAYCAPGP;
    this.NGAYKC = NGAYKC;
  }
}