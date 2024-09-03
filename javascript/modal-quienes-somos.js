const mostrarModal = document.getElementById("mostrar-modal");
const myModal = document.getElementById("myModal");
const cerrar = document.querySelector(".close");

myModal.style.width = "100vw";
myModal.style.height = "100vh";
myModal.style.position = "absolute";
myModal.style.left = "0px";
myModal.style.top = "0px";
mostrarModal.addEventListener("click", () => {
  myModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});
cerrar.addEventListener("click", () => {
  myModal.style.display = "none";
  document.body.style.overflow = "scroll";

});
