const asideMenu = {
  open() {
    document.getElementById("carrito").classList.remove("oculto");
    document.getElementById("opacity").classList.remove("oculto");
    document.body.style.overflow = "hidden";
  },
  close() {
    document.getElementById("carrito").classList.add("oculto");
    document.getElementById("opacity").classList.add("oculto");
    document.body.style.overflow = "auto";
  },
  mostrarProductosEnCarrito(carrito) {
    function crearProductoHtml(producto) {
      const { nombre, precio, imagen, cantidad, id } = producto;
      function truncarString(texto) {
        if (texto.length > 43) {
          return texto.substring(0, 43) + "...";
        } else {
          return texto;
        }
      }

      const hProducto = document.createElement("div");
      hProducto.classList.add("producto");
      hProducto.id = `producto-${id}`;
      const hImagen = document.createElement("div");
      hImagen.classList.add("imagen");
      hImagen.style.backgroundImage = `url("${imagen}")`;
      const hInfo = document.createElement("div");
      hInfo.classList.add("info");
      hInfo.innerHTML = `
            <div class="linea">
              <p class="nombre pmz">${truncarString(nombre)}</p>
              <div class="eliminar" id="btn-eliminar-producto-${id}" onclick="carrito.eliminarProducto(${id});asideMenu.mostrarProductosEnCarrito(carrito);asideMenu.mostrarTotalEnCarrito(carrito)"></div>
            </div>
            <div class="linea">
              <div class="cantidad">
                <div class="menos boton" onclick="asideMenu.substraerEnCarrito(${id},carrito.productos);asideMenu.mostrarProductosEnCarrito(carrito);asideMenu.mostrarTotalEnCarrito(carrito)">-</div>
                <div class="cantidad-actual">${cantidad}</div>
                <div class="mas boton"  onclick="asideMenu.incrementarEnCarrito(${id},carrito.productos);asideMenu.mostrarProductosEnCarrito(carrito);asideMenu.mostrarTotalEnCarrito(carrito)">+</div>
              </div>
              <div class="precios"><p class="pmz">$${(
                precio * cantidad
              ).toFixed(2)}</p></s></p></div>
            </div>
      `;
      // id="btn-eliminar-idProducto" -> resta la compra(carrito de compra vista principal), elimina el producto del carrito, muestra los productos actualizados(vista asideMenu), actualiza el total a pagar(vista asideMenu)
      //
      hProducto.appendChild(hImagen);
      hProducto.appendChild(hInfo);
      return hProducto;
    }
    const hCarrito = document.getElementById("productos-carrito");
    hCarrito.innerHTML = "";
    carrito.productos.forEach((producto) => {
      hCarrito.appendChild(crearProductoHtml(producto));
    });
  },
  mostrarTotalEnCarrito(carrito) {
    const hTotalCarrito = document.getElementById("total-carrito");
    hTotalCarrito.textContent = `$${carrito.calcularTotal().toFixed(2)}`;
  },
  substraerEnCarrito(id, productosCarrito) {
    const producto = productosCarrito.find((p) => p.id == id);

    if (producto) {
      if (producto.cantidad > 1) {
        producto.cantidad--;
      } else {
        console.log("No se puede restar más, la cantidad ya es 1.");
      }
    } else {
      console.log("Producto no encontrado en el carrito.");
    }
  },
  incrementarEnCarrito(id, productosCarrito) {
    const producto = productosCarrito.find((p) => p.id == id);

    if (producto) {
      if (producto.cantidad < 5) {
        producto.cantidad++;
      } else {
        console.log("No se pueden agregar mas de 5 productos.");
      }
    } else {
      console.log("Producto no encontrado en el carrito.");
    }
  },
};
