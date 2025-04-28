export function khoiTaoModal() {
    const closeModalButtons = document.getElementsByClassName('close-modal');

    for (let btn of closeModalButtons) {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal'); // tìm modal cha gần nhất
            if (modal) {
                modal.classList.remove('show');
                modal.classList.add('hidden');
            }
        });
    }

    // Nếu bạn muốn click ra ngoài để ẩn modal thì thêm:
    // window.addEventListener('click', (event) => {
    //     if (event.target.classList.contains('modal')) {
    //         event.target.style.display = 'none';
    //     }
    // });
}
