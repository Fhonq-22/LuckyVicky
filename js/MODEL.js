export class NguoiDung {
    constructor(TenNguoiDung, MatKhau, VaiTro = "Khách hàng", NgayDangKy) {
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