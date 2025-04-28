import { layTatCaKhuVuc, layTatCaVirusXui } from "./CONTROLLER.js";
import { HienThiThongBao } from './thongbao.js';
import { khoiTaoModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  var dsVirus;

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
    document.getElementById('modal-khuvuc').classList.remove('hidden');
    document.getElementById('modal-khuvuc').classList.add('show');

    try {
      const khuVucList = await layTatCaKhuVuc();  // Lấy danh sách khu vực
      const ul = document.getElementById('dsKhuVuc');
      ul.innerHTML = '';  // Xóa nội dung cũ trong danh sách khu vực
      khuVucList.sort((a, b) => a.STT - b.STT);
      khuVucList.forEach(khuVuc => {
        const li = document.createElement('li');
        li.classList.add('khuvuc-item');

        const btn = document.createElement('button');
        btn.classList.add('khuvuc-button');
        btn.textContent = khuVuc.Ten;
        btn.onclick = () => chooseArea(khuVuc.Ten);

        const diaDiem = document.createElement('p');
        diaDiem.classList.add('khuvuc-diadiem');
        diaDiem.innerHTML = `<i class='bx bxs-map'></i>: ${khuVuc.DiaDiem}`;

        const sLVirus = document.createElement('p');
        sLVirus.classList.add('khuvuc-slvirus');
        sLVirus.innerHTML = `<i class='bx bxs-virus'></i>: ${khuVuc.DanhSachVirus.length}`;
        dsVirus = khuVuc.DanhSachVirus;

        const anh = document.createElement('img');
        anh.classList.add('khuvuc-anh');
        anh.src = "./assets/img/" + khuVuc.Anh;
        anh.alt = `Ảnh của ${khuVuc.Ten}`;

        const stt = document.createElement('span');
        stt.classList.add('khuvuc-stt');
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

  window.chooseArea = async function (area) {
    document.getElementById('modal-khuvuc').style.display = 'none'; // Đóng modal khi chọn
    await HienThiThongBao('Bạn đã chọn khu vực: ' + area, 'info', 3);

    document.getElementById('chon-virus').classList.remove('hidden'); // Hiển thị phần tử với hiệu ứng
    HienThiVirusNgauNhien(dsVirus);
    console.log(dsVirus);

    // Hoặc ẩn phần tử với hiệu ứng:
    // chonVirusElement.classList.add('hidden');
  };

  window.HienThiVirusNgauNhien = function (dsVirus) {
    const container = document.getElementById('chon-virus');

    // Xóa tất cả các nút cũ trước khi thêm mới
    container.innerHTML = '';

    dsVirus.forEach(virus => {
      const virusBtn = document.createElement('button');
      virusBtn.classList.add('virus-btn');
      virusBtn.innerHTML = `<i class='bx bxs-virus'></i>`;  // Sử dụng trực tiếp mã virus là tên nút

      virusBtn.setAttribute('data-maVR', virus);
      const randomX = Math.floor(Math.random() * (container.offsetWidth - 100));
      const randomY = Math.floor(Math.random() * (container.offsetHeight - 50));

      virusBtn.style.left = `${randomX}px`;
      virusBtn.style.top = `${randomY}px`;

      // Thêm nút vào phần tử container
      container.appendChild(virusBtn);

      // Thêm sự kiện click cho nút
      virusBtn.addEventListener('click', async () => {
        const virusXuiList = await layTatCaVirusXui();
        const virusTimDuoc = virusXuiList.find(vr => vr.MaVR === virusBtn.getAttribute('data-maVR'));
        
        if (virusTimDuoc) {
          khoiTaoModal();
          document.getElementById('virus-tinhhuong').textContent = `Tình huống: ${virusTimDuoc.TinhHuong}`;
          document.getElementById('virus-thongdiep').textContent = `Thông điệp: ${virusTimDuoc.ThongDiepVicky}`;
          document.getElementById('modal-virus').classList.remove('hidden');
          document.getElementById('modal-virus').classList.add('show');
        }
      });      

    });
  };

});
