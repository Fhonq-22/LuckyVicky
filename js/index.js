import { layTatCaKhuVuc, layTatCaVirusXui, layNangLuong, layNguoiDung, suaNguoiDung, layVirusXui } from "./CONTROLLER.js";
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
  document.getElementById('ThuNhoManHinh').addEventListener('click', () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
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

  document.getElementById('virus-thuthap').addEventListener('click', async function () {
    const modal = document.getElementById('modal-virus');
    const maVR = document.getElementById('virus-mavr').textContent.replace('VIRUS: ', '').trim();
    console.log(maVR);
    const virusBtn = document.querySelector(`.virus-btn[data-mavr="${maVR}"]`);
    const ongNghiemBtn = document.getElementById('ongNghiemBtn');

    if (!ongNghiemBtn) {
      console.error('Không tìm thấy nút ongNghiemBtn!');
      return;
    }

    const nguoiDung = await layNguoiDung(localStorage.getItem('username-luckyvicky'));
    const virusTTArr = nguoiDung.VirusThuThap.split('-').filter(x => x);
    const virusCHArr = nguoiDung.VirusChuyenHoa.split('-').filter(x => x);

    if (!virusTTArr.includes(maVR) && !virusCHArr.includes(maVR)) {
      virusTTArr.unshift(maVR);
      nguoiDung.VirusThuThap = virusTTArr.join('-');
      await suaNguoiDung(nguoiDung);
      HienThiThongBao('Thu thập virus thành công!', 'success', 2);
    }
    else {
      HienThiThongBao('Virus này đã từng được thu thập!', 'info', 2);
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

        const xIcon = document.createElement('span');
        xIcon.textContent = 'x';
        xIcon.className = 'x-icon';
        xIcon.addEventListener('click', async function (e) {
          e.stopPropagation();
          const index = danhSachThuThap.indexOf(virus);
          if (index > -1) {
            danhSachThuThap.splice(index, 1);
            nguoiDung.VirusThuThap = danhSachThuThap.join('-');
            await suaNguoiDung(nguoiDung);
            li.remove();
          }
        });

        li.appendChild(xIcon);
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



document.getElementById('mayChuyenHoaBtn').addEventListener('click', async function () {
  const username = localStorage.getItem('username-luckyvicky');
  const nguoiDung = await layNguoiDung(username);

  if (!nguoiDung) {
    console.error('Không tìm thấy người dùng:', username);
    return;
  }

  const virusThuThap = nguoiDung.VirusThuThap ? nguoiDung.VirusThuThap.split('-').filter(x => x) : [];
  const dsVirusThuThapChuyenHoa = document.getElementById('dsVirusThuThapChuyenHoa');
  dsVirusThuThapChuyenHoa.innerHTML = '';

  if (virusThuThap.length === 0) {
    dsVirusThuThapChuyenHoa.innerHTML = '<li>Không có virus nào được thu thập</li>';
  } else {
    virusThuThap.forEach(virus => {
      const li = document.createElement('li');
      li.textContent = virus;
      li.dataset.virus = virus;

      li.addEventListener('click', () => {
        // Bỏ chọn tất cả trước
        const allLi = dsVirusThuThapChuyenHoa.querySelectorAll('li');
        allLi.forEach(item => item.classList.remove('selected'));

        // Chỉ chọn phần tử đang click
        li.classList.add('selected');
      });

      dsVirusThuThapChuyenHoa.appendChild(li);
    });
  }

  document.getElementById('modal-chuyenhoa').classList.remove('hidden');
  document.getElementById('modal-chuyenhoa').classList.add('show');
});


// Xử lý khi người dùng xác nhận chuyển hóa virus
document.getElementById('confirmChuyenHoa').addEventListener('click', async () => {
  const selectedLi = document.querySelector('#dsVirusThuThapChuyenHoa .selected');
  if (!selectedLi) {
    HienThiThongBao('Chưa chọn virus để chuyển hóa!', 'warning', 2);
    document.getElementById('modal-chuyenhoa').classList.remove('show');
    document.getElementById('modal-chuyenhoa').classList.add('hidden');
    return;
  }

  const maVirus = selectedLi.dataset.virus;
  const virusChon = (await layVirusXui(maVirus));
  if (!virusChon) return;

  // Tạo danh sách vaccin trắc nghiệm
  const vaccinDung = virusChon.Vaccin;
  const danhSachKhac = (await layTatCaVirusXui()).filter(v => v.MaVR !== maVirus);
  const vaccinSai = danhSachKhac.map(v => v.Vaccin).filter((v, i, arr) => v !== vaccinDung && arr.indexOf(v) === i);

  // Chọn ngẫu nhiên 3 vaccin sai
  const vaccinNgauNhien = vaccinSai.sort(() => 0.5 - Math.random()).slice(0, 3);
  const danhSachVaccin = [vaccinDung, ...vaccinNgauNhien].sort(() => 0.5 - Math.random());

  // Hiển thị modal chọn vaccin
  const vungVaccin = document.getElementById('danhSachVaccin');
  vungVaccin.innerHTML = '';
  danhSachVaccin.forEach((vac, index) => {
    const div = document.createElement('div');
    div.className = 'vaccin-lua-chon';
    div.textContent = `${String.fromCharCode(65 + index)}. ${vac}`; // A., B., C., D.
    div.dataset.vaccin = vac;
    div.addEventListener('click', () => {
      document.querySelectorAll('.vaccin-lua-chon').forEach(d => d.classList.remove('selected'));
      div.classList.add('selected');
    });
    vungVaccin.appendChild(div);
  });

  document.getElementById('tinhHuongChuyenHoa').textContent = virusChon.TinhHuong;
  document.getElementById('chonVaccinModal').classList.remove('hidden');
  document.getElementById('chonVaccinModal').classList.add('show');

  // Xử lý xác nhận chọn vaccin
  document.getElementById('xacNhanLuaChonVaccin').onclick = async () => {
    const vaccinChon = document.querySelector('.vaccin-lua-chon.selected');
    if (!vaccinChon) {
      HienThiThongBao('Bạn chưa chọn vaccin!', 'warning', 2);
      return;
    }

    if (vaccinChon.dataset.vaccin !== vaccinDung) {
      HienThiThongBao('Sai vaccin! Chuyển hóa thất bại.', 'error', 3);
      document.getElementById('chonVaccinModal').classList.remove('show');
      document.getElementById('chonVaccinModal').classList.add('hidden');
      return;
    }

    const nguoiDung = await layNguoiDung(localStorage.getItem('username-luckyvicky'));
    const virusThuThap = nguoiDung.VirusThuThap ? nguoiDung.VirusThuThap.split('-').filter(x => x) : [];
    const virusChuyenHoa = nguoiDung.VirusChuyenHoa ? nguoiDung.VirusChuyenHoa.split('-').filter(x => x) : [];

    const index = virusThuThap.indexOf(maVirus);
    if (index > -1) virusThuThap.splice(index, 1);
    virusChuyenHoa.unshift(maVirus);

    nguoiDung.VirusThuThap = virusThuThap.join('-');
    nguoiDung.VirusChuyenHoa = virusChuyenHoa.join('-');

    await suaNguoiDung(nguoiDung);

    document.getElementById('chonVaccinModal').classList.remove('show');
    document.getElementById('chonVaccinModal').classList.add('hidden');
    HienThiThongBao('Chuyển hóa virus thành công!', 'success', 2);

    document.getElementById('modal-chuyenhoa').classList.remove('show');
    document.getElementById('modal-chuyenhoa').classList.add('hidden');
    // Hiển thị modal thông điệp Vicky sau khi chuyển hóa thành công
    if (virusChon.ThongDiepVicky) {
      document.getElementById('thongdiep-nguoigui').textContent = `Người gửi: ${virusChon.TenVirus || 'Virus Vô Danh'}`;
      document.getElementById('thongdiep-nguoinhan').textContent = `Người nhận: ${nguoiDung.Ten || 'Chiến binh dũng cảm'}`;
      document.getElementById('thongdiep-noidung').textContent = `"${virusChon.ThongDiepVicky}"`;

      const modal = document.getElementById('modal-thongdiepVicky');
      modal.classList.remove('hidden');
      modal.classList.add('show');
    }


  };
});

