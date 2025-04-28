import { addData, getData, updateData, deleteData } from "./firebase-CRUD.js";
import { NguoiDung, KhuVuc } from "./MODEL.js";

// #region XỬ LÝ NguoiDung
export async function themNguoiDung(nguoiDung) {
    await addData("NguoiDung", nguoiDung.TenNguoiDung, new NguoiDung(...Object.values(nguoiDung)).toJSON());
}

export async function layNguoiDung(tenNguoiDung) {
    const data = await getData("NguoiDung", tenNguoiDung);
    return data ? new NguoiDung(tenNguoiDung, data.MatKhau, data.VaiTro, data.NgayDangKy) : null;
}

export async function layTatCaNguoiDung() {
    const data = await getData("NguoiDung","");
    return data ? Object.keys(data) : [];
}

export async function suaNguoiDung(tenNguoiDung, newData) {
    const updatedNguoiDung = new NguoiDung(tenNguoiDung, newData.MatKhau, newData.VaiTro);
    await updateData("NguoiDung", tenNguoiDung, updatedNguoiDung.toJSON());
}

export async function xoaNguoiDung(tenNguoiDung) {
    await deleteData("NguoiDung", tenNguoiDung);
}
// #endregion

// #region XỬ LÝ KhuVuc
export async function themKhuVuc(khuVuc) {
    await addData("KhuVuc", khuVuc.MaKV, new KhuVuc(...Object.values(khuVuc)).toJSON());
}

export async function layKhuVuc(maKV) {
    const data = await getData("KhuVuc", maKV);
    return data ? new KhuVuc(maKV, data.Ten, data.MoTa, data.DiaDiem, data.DanhSachVirus, data.Anh, data.STT) : null;
}

export async function layTatCaKhuVuc() {
    const data = await getData("KhuVuc", "");
    return data ? Object.keys(data).map(key => new KhuVuc(key, data[key].Ten, data[key].MoTa, data[key].DiaDiem, data[key].DanhSachVirus, data[key].Anh, data[key].STT)) : [];
}

export async function suaKhuVuc(maKV, newData) {
    const updatedKhuVuc = new KhuVuc(maKV, newData.Ten, newData.MoTa, newData.DiaDiem, newData.DanhSachVirus, newData.Anh, newData.STT);
    await updateData("KhuVuc", maKV, updatedKhuVuc.toJSON());
}

export async function xoaKhuVuc(maKV) {
    await deleteData("KhuVuc", maKV);
}
// #endregion