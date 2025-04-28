export class NguoiDung {
    constructor(TenNguoiDung, MatKhau, VaiTro, NgayDangKy) {
        this.TenNguoiDung = TenNguoiDung;
        this.MatKhau = MatKhau;
        this.VaiTro = VaiTro;
        this.NgayDangKy = NgayDangKy;
    }

    toJSON() {
        return {
            MatKhau: this.MatKhau,
            VaiTro: this.VaiTro,
            NgayDangKy: this.NgayDangKy
        };
    }
}

export class KhuVuc {
    constructor(MaKV, Ten, MoTa, DiaDiem, DanhSachVirus, Anh, STT) {
        this.MaKV = MaKV;
        this.Ten = Ten;
        this.MoTa = MoTa;
        this.DiaDiem = DiaDiem;
        this.DanhSachVirus = DanhSachVirus;
        this.Anh = Anh;
        this.STT = STT;
    }

    toJSON() {
        return {
            Ten: this.Ten,
            MoTa: this.MoTa,
            DiaDiem: this.DiaDiem,
            DanhSachVirus: this.DanhSachVirus,
            Anh: this.Anh,
            STT: this.STT
        };
    }
}