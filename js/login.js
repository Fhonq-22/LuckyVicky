// login.js
import { layNguoiDung, themNguoiDung } from "./CONTROLLER.js";
import { HienThiThongBao } from './thongbao.js';

function kiemTraChuyenHuong(url) {
    window.location.href = url;
}

// Đảm bảo rằng bạn có ngừng hành động mặc định của form
document.querySelector('.login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.querySelector('[name="username"]').value;
    const password = document.querySelector('[name="password"]').value;

    // Kiểm tra thông tin người dùng
    if (username === "" || password === "") {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    try {
        const userData = await layNguoiDung(username);
        if (userData) {
            if (userData.MatKhau === password) {
                alert(`Đăng nhập thành công! Vai trò: ${userData.VaiTro}`);
                localStorage.setItem("username", username);
                switch (userData.VaiTro) {
                    case "Player":
                        kiemTraChuyenHuong("index.html");
                        break;
                    case "Admin":
                        kiemTraChuyenHuong("admin.html");
                        break;
                    default:
                        alert("Vai trò không hợp lệ!");
                        break;
                }
            } else {
                alert("Sai mật khẩu!");
                console.log(userData.MatKhau);
            }
        } else {
            alert("Tài khoản không tồn tại!");
        }
    } catch (error) {
        alert("Lỗi đăng nhập: " + error.message);
    }
});
document.querySelector('.register-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.querySelector('[name="username"]').value;
    const password = document.querySelector('[name="password"]').value;
    const repass = document.querySelector('[name="confirm-password"]').value;
    if (!username || !password || !repass) {
        HienThiThongBao('Vui lòng nhập đầy đủ thông tin!', 'warning');
        return;
    }
    if (password !== repass) {
        HienThiThongBao('Mật khẩu xác nhận không khớp!', 'error');
        return;
    }
    const userData = await layNguoiDung(username);
    try {
        if (userData) {
            HienThiThongBao('Tên người dùng đã tồn tại!', 'warning');
            return;
        }
        const nguoiDung = {
            TenNguoiDung: username,
            MatKhau: password,
            VaiTro: "Player",
            NgayDangKy: new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')
        };
        await themNguoiDung(nguoiDung);
        HienThiThongBao('Đăng ký thành công!', 'success');
    } catch (error) {
        HienThiThongBao('Lỗi đăng ký: '+ error.message, 'error');
    }
});