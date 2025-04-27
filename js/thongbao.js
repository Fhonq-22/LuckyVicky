// notification.js
export function HienThiThongBao(message, type = 'success') {
    // Tạo phần tử notification và các phần tử con
    const notification = document.createElement('div');
    const notificationText = document.createElement('span');
    const closeBtn = document.createElement('button');
  
    // Thêm lớp CSS cho thông báo và các phần tử
    notification.classList.add('notification', type);
    closeBtn.classList.add('close-btn');
  
    // Thêm nội dung thông báo và nút đóng
    notificationText.textContent = message;
    closeBtn.textContent = '×';
  
    // Thêm sự kiện đóng thông báo khi nhấn nút
    closeBtn.addEventListener('click', () => {
      notification.style.display = 'none';
    });
  
    // Thêm các phần tử vào DOM
    notification.appendChild(notificationText);
    notification.appendChild(closeBtn);
    document.body.appendChild(notification);
  
    // Hiển thị thông báo
    notification.style.display = 'flex';
  
    // Tự động đóng thông báo sau 5 giây
    setTimeout(() => {
      notification.style.display = 'none';
    }, 5000);
  }
  