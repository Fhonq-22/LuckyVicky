export function HienThiThongBao(message, type = 'success', time = 5) {
    return new Promise((resolve) => {
      const notification = document.createElement('div');
      const notificationText = document.createElement('span');
      const closeBtn = document.createElement('button');
  
      notification.classList.add('notification', type);
      closeBtn.classList.add('close-btn');
  
      notificationText.textContent = message;
      closeBtn.textContent = '×';
  
      closeBtn.addEventListener('click', () => {
        notification.remove();
        resolve(); // Nếu người dùng tự đóng, cũng resolve luôn
      });
  
      notification.appendChild(notificationText);
      notification.appendChild(closeBtn);
      document.body.appendChild(notification);
  
      notification.style.display = 'flex';
      notification.style.setProperty('--animation-time', `${time}s`);
      setTimeout(() => {
        notification.remove();
        resolve();
      }, time*1000);
    });
  }
  