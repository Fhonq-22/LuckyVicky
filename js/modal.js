export function khoiTaoModal() {
    const modalKhuVuc = document.getElementById('modal-khuvuc');
    const closeModal = document.getElementById('closeModal');

    // Khi nhấn vào nút đóng (x), ẩn modal
    closeModal.addEventListener('click', () => {
        modalKhuVuc.style.display = 'none';
    });

    // Khi nhấn bất kỳ nơi nào ngoài modal, ẩn modal
    // window.addEventListener('click', (event) => {
    //     if (event.target === modalKhuVuc) {
    //         modalKhuVuc.style.display = 'none';
    //     }
    // });
}
