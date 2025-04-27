import { addData, getData, updateData, deleteData } from "./firebase-CRUD.js";
import { NguoiDung } from "./MODEL.js";

// #region XỬ LÝ NguoiDung
export async function themNguoiDung(nguoiDung) {
    await addData("NguoiDung", nguoiDung.TenNguoiDung, new NguoiDung(...Object.values(nguoiDung)).toJSON());
}

export async function layNguoiDung(tenNguoiDung) {
    const data = await getData("NguoiDung", tenNguoiDung);
    return data ? new NguoiDung(tenNguoiDung, data.MatKhau, data.VaiTro, data.NgayDangKy) : null;
}

export async function layDanhSachNguoiDung() {
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