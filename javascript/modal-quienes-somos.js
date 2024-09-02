const mostrarModal = document.getElementById('mostrar-modal');
const myModal = document.getElementById('myModal');
const cerrar = document.querySelector('.close');

mostrarModal.addEventListener('click', () => {
    myModal.style.display = 'flex';
})
cerrar.addEventListener('click', () => {
    myModal.style.display = 'none';
})