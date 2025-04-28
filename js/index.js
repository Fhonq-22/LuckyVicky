import { layTatCaKhuVuc } from "./CONTROLLER.js";
import { HienThiThongBao } from './thongbao.js';
import { khoiTaoModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ToanManHinh').addEventListener('click', () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari và Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
  });

  khoiTaoModal();
  document.getElementById('showKhuVucBtn').addEventListener('click', async () => {
    document.getElementById('modal-khuvuc').style.display = 'block';

    try {
      const khuVucList = await layTatCaKhuVuc();  // Lấy danh sách khu vực
      const ul = document.getElementById('dsKhuVuc');
      ul.innerHTML = '';  // Xóa nội dung cũ trong danh sách khu vực
      khuVucList.sort((a, b) => a.STT - b.STT);
      khuVucList.forEach(khuVuc => {
        const li = document.createElement('li');
        li.classList.add('khu-vuc-item');

        const btn = document.createElement('button');
        btn.classList.add('khu-vuc-button');
        btn.textContent = khuVuc.Ten;
        btn.onclick = () => chooseArea(khuVuc.Ten);

        const diaDiem = document.createElement('p');
        diaDiem.classList.add('khu-vuc-diadiem');
        diaDiem.textContent = `Địa điểm: ${khuVuc.DiaDiem}`;

        const sLVirus = document.createElement('p');
        sLVirus.classList.add('khu-vuc-sl-virus');
        sLVirus.textContent = `Số lượng virus xui: ${khuVuc.DanhSachVirus.length}`;        

        const anh = document.createElement('img');
        anh.classList.add('khu-vuc-anh');
        anh.src = "./assets/img/"+khuVuc.Anh;
        anh.alt = `Ảnh của ${khuVuc.Ten}`;

        const stt = document.createElement('span');
        stt.classList.add('khu-vuc-stt');
        stt.textContent = `#${khuVuc.STT}`;

        li.appendChild(stt);
        li.appendChild(btn);
        li.appendChild(sLVirus);
        li.appendChild(diaDiem);
        li.appendChild(anh);

        ul.appendChild(li);
      });

    } catch (error) {
      HienThiThongBao('Lỗi khi lấy danh sách khu vực:' + error, 'error');
      console.error('Lỗi khi lấy danh sách khu vực:', error);
    }
  });

  window.chooseArea = function (area) {
    HienThiThongBao('Bạn đã chọn khu vực: ' + area, 'info');
    document.getElementById('modal-khuvuc').style.display = 'none'; // Đóng modal khi chọn
  };

});
