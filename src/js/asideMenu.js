const asideMenu = {
  mostrarCarrito() {
    document.getElementById("carrito").classList.remove("oculto");
    document.getElementById("opacity").classList.remove("oculto");
    document.body.style.overflow = "hidden";
  },

  ocultarCarrito() {
    document.getElementById("carrito").classList.add("oculto");
    document.getElementById("opacity").classList.add("oculto");
    document.body.style.overflow = "auto";
  },

  truncarString(texto) {
    if (texto.length > 43) {
      return texto.substring(0, 43) + "...";
    } else {
      return texto;
    }
  },
  crearProductoHtml(producto) {
    const { nombre, precio, imagen, cantidad, id } = producto;

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
            <p class="nombre pmz">${this.truncarString(nombre)}</p>
            <div class="eliminar" onclick="asideMenu.restarCompra();carrito.eliminarProducto(${id});asideMenu.mostrarProductosEnCarrito(carrito.productos);asideMenu.mostrarTotalEnCarrito(carrito)"></div>
          </div>
          <div class="linea">
            <div class="cantidad">
              <div class="menos boton" onclick="asideMenu.substraerEnCarrito(${id},carrito.productos);asideMenu.mostrarProductosEnCarrito(carrito.productos);asideMenu.mostrarTotalEnCarrito(carrito)">-</div>
              <div class="cantidad-actual">${cantidad}</div>
              <div class="mas boton"  onclick="asideMenu.incrementarEnCarrito(${id},carrito.productos);asideMenu.mostrarProductosEnCarrito(carrito.productos);asideMenu.mostrarTotalEnCarrito(carrito)">+</div>
            </div>
            <div class="precios"><p class="pmz">$${(precio * cantidad).toFixed(
              2
            )}</p></s></p></div>
          </div>
    `;

    hProducto.appendChild(hImagen);
    hProducto.appendChild(hInfo);
    return hProducto;
  },
  mostrarProductosEnCarrito(carrito) {
    const hCarrito = document.getElementById("productos-carrito");
    hCarrito.innerHTML = "";
    carrito.forEach((producto) => {
      hCarrito.appendChild(this.crearProductoHtml(producto));
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

  restarCompra() {
    document.getElementById("compras").textContent =
      parseInt(document.getElementById("compras").textContent) - 1;
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

  controlCarrito(e, carrito) {
    if (e.target.classList.contains("btn-agregar-carrito")) {
      this.mostrarProductosEnCarrito(carrito);
      // this.mostrarTotalEnCarrito(carrito);
      this.mostrarCarrito();
    } else {
      switch (e.target.id) {
        case "carrito-compras":
          this.mostrarProductosEnCarrito(carrito);
          // this.mostrarTotalEnCarrito(carrito);
          this.mostrarCarrito();
          break;
        case "cerrar-carrito":
          this.ocultarCarrito();
          break;

        case `opacity`:
          this.ocultarCarrito();
          break;

        case "ver-mas-productos":
          this.ocultarCarrito();

          break;
        default:
          break;
      }
    }
  },
};

