// Kiểm tra nếu form đăng nhập đã được gửi qua URL
const params = new URLSearchParams(window.location.search);
const email = params.get('email');
const password = params.get('password');

if (email && password) {
  // Thực hiện kiểm tra email và mật khẩu
  if (email === "admin@example.com" && password === "12345") {
    document.getElementById('login-message').innerHTML = "<p>Đăng nhập thành công!</p>";
  } else {
    document.getElementById('login-message').innerHTML = "<p>Email hoặc mật khẩu không đúng!</p>";
  }
}
