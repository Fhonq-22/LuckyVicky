import { layTatCaKhuVuc, layTatCaVirusXui, layNangLuong, layNguoiDung } from "./CONTROLLER.js";
import { HienThiThongBao } from './thongbao.js';
import { khoiTaoModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  let dsVirus;

  function hienThiDiv(id) {
    const div = document.getElementById(id);
    div.classList.remove('hidden');
    div.classList.add('show');
  }

  function anDiv(id) {
    const div = document.getElementById(id);
    div.classList.remove('show');
    div.classList.add('hidden');
  }

  document.getElementById('showCaiDatBtn').addEventListener('click', () => {
    hienThiDiv('modal-caidat');
  });

  document.querySelectorAll('#dsChuDe li').forEach(li => {
    li.addEventListener('click', () => {
      const chuDe = li.getAttribute('data-chude');
      document.documentElement.className = '';
      if (chuDe) document.documentElement.classList.add(chuDe);
    });
  });

  document.getElementById('ToanManHinh').addEventListener('click', () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  });

  khoiTaoModal();

  document.getElementById('showKhuVucBtn').addEventListener('click', async () => {
    hienThiDiv('modal-khuvuc');

    try {
      const khuVucList = await layTatCaKhuVuc();
      const ul = document.getElementById('dsKhuVuc');
      ul.innerHTML = '';
      khuVucList.sort((a, b) => a.STT - b.STT);

      khuVucList.forEach(khuVuc => {
        const li = document.createElement('li');
        li.className = 'khuvuc-item';

        li.innerHTML = `
          <span class="khuvuc-stt">#${khuVuc.STT}</span>
          <button class="khuvuc-button">${khuVuc.Ten}</button>
          <p class="khuvuc-slvirus"><i class='bx bxs-virus'></i>: ${khuVuc.DanhSachVirus.length}</p>
          <p class="khuvuc-diadiem"><i class='bx bxs-map'></i>: ${khuVuc.DiaDiem}</p>
          <img class="khuvuc-anh" src="./assets/img/${khuVuc.Anh}" alt="Ảnh của ${khuVuc.Ten}">
        `;

        li.querySelector('button').onclick = () => chooseArea(khuVuc.Ten);
        ul.appendChild(li);
      });

    } catch (error) {
      HienThiThongBao('Lỗi khi lấy danh sách khu vực: ' + error, 'error');
      console.error(error);
    }
  });

  window.chooseArea = async function (area) {
    anDiv('modal-khuvuc');
    await HienThiThongBao(`Bạn đã chọn khu vực: ${area}`, 'info', 3);
    hienThiDiv('chon-virus');

    const khuVuc = (await layTatCaKhuVuc()).find(kv => kv.Ten === area);
    dsVirus = khuVuc.DanhSachVirus;
    HienThiVirusNgauNhien(dsVirus);
  };

  window.HienThiVirusNgauNhien = function (dsVirus) {
    const container = document.getElementById('chon-virus');
    container.innerHTML = '';

    dsVirus.forEach(virus => {
      const virusBtn = document.createElement('button');
      virusBtn.className = 'virus-btn';
      virusBtn.innerHTML = `<i class='bx bxs-virus'></i>`;
      virusBtn.dataset.mavr = virus;

      virusBtn.style.left = `${Math.random() * (container.offsetWidth - 100)}px`;
      virusBtn.style.top = `${Math.random() * (container.offsetHeight - 50)}px`;

      virusBtn.addEventListener('click', async () => {
        const virusXuiList = await layTatCaVirusXui();
        const virusTimDuoc = virusXuiList.find(vr => vr.MaVR === virusBtn.dataset.mavr);

        if (virusTimDuoc) {
          // khoiTaoModal();
          document.getElementById('virus-mavr').textContent = `VIRUS: ${virusTimDuoc.MaVR}`;

          document.querySelectorAll('#virus-mucdo .mucdo').forEach((div, index) => {
            div.style.backgroundColor = index < virusTimDuoc.MucDo ? 'var(--color-06)' : 'var(--color-01)';
          });

          document.getElementById('virus-tinhhuong').innerText = `Tình huống:\n ${virusTimDuoc.TinhHuong}`;
          document.getElementById('virus-vaccin').textContent = `Vaccin: ${virusTimDuoc.Vaccin}`;

          const virusDiemList = document.getElementById('virus-diemnangluong');
          virusDiemList.innerHTML = '';

          for (const diem of virusTimDuoc.DiemNangLuong.split('-')) {
            const [maNL, diemSo] = [diem.slice(0, 4), diem.slice(4)];
            const nangLuong = await layNangLuong(maNL);

            const item = document.createElement('li');
            item.innerHTML = `
              <p style="background-image:linear-gradient(to right, ${nangLuong.MauSac}, var(--color-03))">${maNL}</p>
              <p style="background-image:linear-gradient(to left, ${nangLuong.MauSac}, var(--color-03))">+${diemSo}</p>
            `;
            virusDiemList.appendChild(item);
          }

          hienThiDiv('modal-virus');
        }
      });

      container.appendChild(virusBtn);
    });
  };

  document.getElementById('virus-thuthap').addEventListener('click', function () {
    const modal = document.getElementById('modal-virus');
    const maVR = document.getElementById('virus-mavr').textContent.replace('VIRUS: ', '').trim();
    console.log(maVR);
    const virusBtn = document.querySelector(`.virus-btn[data-mavr="${maVR}"]`);
    const ongNghiemBtn = document.getElementById('ongNghiemBtn');

    if (!ongNghiemBtn) {
      console.error('Không tìm thấy nút ongNghiemBtn!');
      return;
    }

    modal.classList.remove('show');
    modal.classList.add('hidden');
    document.getElementById('chon-virus').classList.remove('show');
    document.getElementById('chon-virus').classList.add('hidden');

    const rectStart = virusBtn.getBoundingClientRect();
    const rectEnd = ongNghiemBtn.getBoundingClientRect();

    const virus = document.createElement('div');
    virus.classList.add('flying-virus');
    document.body.appendChild(virus);

    // Vị trí bắt đầu ở nút "thu thập"
    virus.style.left = (rectStart.left + rectStart.width / 2) + 'px';
    virus.style.top = (rectStart.top + rectStart.height / 2) + 'px';

    // Force reflow để chắc chắn cập nhật vị trí
    void virus.offsetWidth;

    // Vị trí bay đến: trung tâm nút ống nghiệm
    virus.style.setProperty('--start-x', rectStart.left + rectStart.width / 2 + 'px');
    virus.style.setProperty('--start-y', rectStart.top + rectStart.height / 2 + 'px');
    virus.style.setProperty('--end-x', rectEnd.left + rectEnd.width / 2 + 'px');
    virus.style.setProperty('--end-y', rectEnd.top + rectEnd.height / 2 + 'px');

    virus.classList.add('fly-to-ongnghiem');

    virus.addEventListener('animationend', () => {
      virus.remove();
    });
  });

  document.getElementById('ongNghiemBtn').addEventListener('click', async function () {
    const username = localStorage.getItem('username-luckyvicky');
    const nguoiDung = await layNguoiDung(username);

    if (!nguoiDung) {
      console.error('Không tìm thấy người dùng:', username);
      return;
    }

    const dsVirusThuThap = document.getElementById('dsVirusThuThap');
    const dsVirusChuyenHoa = document.getElementById('dsVirusChuyenHoa');

    // Xóa nội dung cũ nếu có
    dsVirusThuThap.innerHTML = '';
    dsVirusChuyenHoa.innerHTML = '';

    // Xử lý VirusThuThap
    if (nguoiDung.VirusThuThap && nguoiDung.VirusThuThap.trim() !== '') {
      const danhSachThuThap = nguoiDung.VirusThuThap.split('-');
      danhSachThuThap.forEach(virus => {
        const li = document.createElement('li');
        li.textContent = virus;
        dsVirusThuThap.appendChild(li);
      });
    } else {
      dsVirusThuThap.innerHTML = '<li>Chưa thu thập được virus nào</li>';
    }

    // Xử lý VirusChuyenHoa
    if (nguoiDung.VirusChuyenHoa && nguoiDung.VirusChuyenHoa.trim() !== '') {
      const danhSachChuyenHoa = nguoiDung.VirusChuyenHoa.split('-');
      danhSachChuyenHoa.forEach(virus => {
        const li = document.createElement('li');
        li.textContent = virus;
        dsVirusChuyenHoa.appendChild(li);
      });
    } else {
      dsVirusChuyenHoa.innerHTML = '<li>Chưa chuyển hóa được virus nào</li>';
    }

    // Mở modal
    document.getElementById('modal-ongnghiem').classList.remove('hidden');
    document.getElementById('modal-ongnghiem').classList.add('show');
  });

});
