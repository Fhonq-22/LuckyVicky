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
        await HienThiThongBao('Vui lòng điền đầy đủ thông tin!', 'warning');
        return;
    }

    try {
        const userData = await layNguoiDung(username);
        if (userData) {
            if (userData.MatKhau === password) {
                await HienThiThongBao('Đăng nhập thành công! Vai trò: '+userData.VaiTro, 'success');
                localStorage.setItem("username-luckyvicky", username);
                switch (userData.VaiTro) {
                    case "Player":
                        kiemTraChuyenHuong("index.html");
                        break;
                    case "Admin":
                        kiemTraChuyenHuong("admin.html");
                        break;
                    default:
                        await HienThiThongBao('Vai trò không hợp lệ!', 'warning');
                        break;
                }
            } else {
                await HienThiThongBao('Sai mật khẩu!', 'warning');
            }
        } else {
            await HienThiThongBao('Tài khoản không tồn tại!', 'warning');
        }
    } catch (error) {
        await HienThiThongBao('Lỗi đăng nhập: ' + error.message, 'error');
    }
});
document.querySelector('.register-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.querySelector('[name="username"]').value;
    const password = document.querySelector('[name="password"]').value;
    const repass = document.querySelector('[name="confirm-password"]').value;
    if (!username || !password || !repass) {
        await HienThiThongBao('Vui lòng nhập đầy đủ thông tin!', 'warning');
        return;
    }
    if (password !== repass) {
        await HienThiThongBao('Mật khẩu xác nhận không khớp!', 'error');
        return;
    }
    const userData = await layNguoiDung(username);
    try {
        if (userData) {
            await HienThiThongBao('Tên người dùng đã tồn tại!', 'warning');
            return;
        }
        const nguoiDung = {
            TenNguoiDung: username,
            MatKhau: password,
            VaiTro: "Player",
            NgayDangKy: new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'),
            VirusThuThap: "",
            VirusChuyenHoa: ""
        };
        await themNguoiDung(nguoiDung);
        await HienThiThongBao('Đăng ký thành công!', 'success');
    } catch (error) {
        await HienThiThongBao('Lỗi đăng ký: '+ error.message, 'error');
    }
});