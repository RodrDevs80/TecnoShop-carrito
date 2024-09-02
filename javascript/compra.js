const openModal = document.getElementById('realizar-compra');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.cerrar-modal');


openModal.addEventListener('click', () => {
    modal.classList.add('modal-show')
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('modal-show');
    window.location.reload();
});