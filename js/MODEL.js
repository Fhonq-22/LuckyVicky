export class NguoiDung {
    constructor(TenNguoiDung, MatKhau, VaiTro, NgayDangKy, VirusThuThap, VirusChuyenHoa) {
        this.TenNguoiDung = TenNguoiDung;
        this.MatKhau = MatKhau;
        this.VaiTro = VaiTro;
        this.NgayDangKy = NgayDangKy;
        this.VirusThuThap = VirusThuThap;
        this.VirusChuyenHoa = VirusChuyenHoa;
    }

    toJSON() {
        return {
            MatKhau: this.MatKhau,
            VaiTro: this.VaiTro,
            NgayDangKy: this.NgayDangKy,
            VirusThuThap: this.VirusThuThap,
            VirusChuyenHoa: this.VirusChuyenHoa
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

export class VirusXui {
    constructor(MaVR, TinhHuong, MucDo, Vaccin, DiemNangLuong, ThongDiepVicky) {
        this.MaVR = MaVR;
        this.TinhHuong = TinhHuong;
        this.MucDo = MucDo;
        this.Vaccin = Vaccin;
        this.DiemNangLuong = DiemNangLuong;
        this.ThongDiepVicky = ThongDiepVicky;
    }

    toJSON() {
        return {
            TinhHuong: this.TinhHuong,
            MucDo: this.MucDo,
            Vaccin: this.Vaccin,
            DiemNangLuong: this.DiemNangLuong,
            ThongDiepVicky: this.ThongDiepVicky
        };
    }
}


export class NangLuong {
    constructor(MaNL, Ten, MoTa, MauSac, Icon) {
        this.MaNL = MaNL;  // Mã năng lượng (MaNL)
        this.Ten = Ten;    // Tên năng lượng
        this.MoTa = MoTa;  // Mô tả năng lượng
        this.MauSac = MauSac; // Màu sắc
        this.Icon = Icon; // Biểu tượng (icon)
    }

    toJSON() {
        return {
            MaNL: this.MaNL,
            Ten: this.Ten,
            MoTa: this.MoTa,
            MauSac: this.MauSac,
            Icon: this.Icon
        };
    }
}

