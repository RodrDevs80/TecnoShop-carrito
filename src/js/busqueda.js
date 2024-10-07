const btnBuscar = document.getElementById("btn-buscar");
const searchInput = document.getElementById("search_input");
const contenedorBusqueda = document.getElementById("contenedor-busqueda");

const buscar = (nombreBuscado) => {
  return productos.filter((p) =>
    p.nombre
      .toLowerCase()
      .includes(
        nombreBuscado.toLowerCase() ||
        p.descripcion.toLowerCase().includes(nombreBuscado.toLowerCase())
      )
  );
};

btnBuscar.addEventListener("click", () => {
  contenedorBusqueda.style.display = "flex";
  contenedorBusqueda.innerHTML = "";
  if (searchInput.value.length !== 0) {
    buscar(searchInput.value).forEach((p) => console.log(p.nombre));
    if (buscar(searchInput.value).length === 0) {
      contenedorBusqueda.innerHTML =
        "Ningún producto coincide con la búsqueda 😢";
    }
    buscar(searchInput.value).forEach(
      (p) =>
      (contenedorBusqueda.innerHTML += `<div class="contenedor-busqueda-resultado">
            <div class="">
            <a id="${p.id}link" class="texto-resultado-busqueda" href="#pvp${p.id
        }">${p.nombre.substring(0, 19)}.....</a>
            </div>
             <img class="img-busqueda" src="${p.imagen}" alt="">
             <a id="${p.id}link-bis" class="link-busqueda" href="#pvp${p.id
        }" ><svg class ="svg-buscar" viewBox="0 0 256 256" height="32" width="38" xmlns="http://www.w3.org/2000/svg"><path
      d="M74.34 85.66a8 8 0 0 1 11.32-11.32L120 108.69V24a8 8 0 0 1 16 0v84.69l34.34-34.35a8 8 0 0 1 11.32 11.32l-48 48a8 8 0 0 1-11.32 0ZM240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h52.4a4 4 0 0 1 2.83 1.17L111 145a24 24 0 0 0 34 0l23.8-23.8a4 4 0 0 1 2.8-1.2H224a16 16 0 0 1 16 16m-40 32a12 12 0 1 0-12 12a12 12 0 0 0 12-12"
      fill="currentColor"
    ></path></svg></a>`)
    );
  }

  contenedorBusqueda.addEventListener("click", (e) => {
    if (e.target.classList[0] === "svg-buscar" || e.target.classList[0] === "link-busqueda" || e.target.classList[0] === "texto-resultado-busqueda") {
      searchInput.value = "";
      contenedorBusqueda.style.display = "none";
      searchInput.focus();
    }
  })
});

searchInput.addEventListener("change", () => {
  if (searchInput.value.length === 0) {
    contenedorBusqueda.innerHTML = "";
    contenedorBusqueda.style.display = "none";
  }
});
