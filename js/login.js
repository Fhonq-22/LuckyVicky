// login.js
import { layNguoiDung, layDanhSachNguoiDung } from "./CONTROLLER.js";

async function kiemTraDangNhap() {
    event.preventDefault();  // Ngừng hành động mặc định của form

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
}

function kiemTraChuyenHuong(url) {
    window.location.href = url;
}

// Đảm bảo rằng bạn có ngừng hành động mặc định của form
document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Ngừng hành động mặc định của form
    kiemTraDangNhap();  // Gọi hàm xử lý đăng nhập
});
