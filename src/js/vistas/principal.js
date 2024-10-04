const principal = {
  cargarProductosPaginaPrincipal(
    idContenedorHtml,
    arrayProductos,
    carritoDeCompras
  ) {
    const htmlContenedor = document.getElementById(idContenedorHtml);
    arrayProductos.forEach((producto) => {
      const { id, nombre, imagen, descripcion, precio, categoria } = producto;
      const hCardProducto = document.createElement("article");
      const hNombre = document.createElement("h4");
      const hImagen = document.createElement("img");
      const hDescripcion = document.createElement("p");
      const hPrecio = document.createElement("h4");
      const btnAgregarAlCarrito = document.createElement("button");
      /* HTML: <div class="ribbon">Your text content</div> */
      const div = document.createElement("div");
      div.classList.add("ribbon");
      div.textContent = "Producto Premium";
      hCardProducto.classList.add("tarjeta-Producto");
      hCardProducto.classList.add("shadow");
      // pvp -> producto vista principal
      hCardProducto.id = `pvp${id}`;

      hNombre.textContent = nombre;
      hNombre.classList.add("nombre-producto");

      hImagen.src = imagen;
      hImagen.alt = nombre;
      hImagen.classList.add("img-producto");

      hDescripcion.textContent = descripcion;
      hPrecio.classList.add("precio");
      hPrecio.textContent = `$${precio} Dolares`;

      btnAgregarAlCarrito.id = `add${id}`;
      btnAgregarAlCarrito.classList.add("btn-agregar-carrito");
      btnAgregarAlCarrito.textContent = "Agregar 🛒";
      const manejarAgregarAlCarrito = () => {
        carritoDeCompras.agregarProducto(
          new Producto(nombre, precio, descripcion, imagen, categoria, 1, id)
        );
      };
      btnAgregarAlCarrito.addEventListener("click", manejarAgregarAlCarrito);
      hCardProducto.appendChild(div);
      hCardProducto.appendChild(hImagen);
      hCardProducto.appendChild(hNombre);
      hCardProducto.appendChild(hDescripcion);
      hCardProducto.appendChild(hPrecio);
      hCardProducto.appendChild(btnAgregarAlCarrito);
      htmlContenedor.appendChild(hCardProducto);
    });
  },
};
