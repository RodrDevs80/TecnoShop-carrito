// alvaro ojeda estuvo aqui

function mostrarCarrito() {
  document.getElementById("carrito").classList.remove("oculto");
  document.getElementById("opacity").classList.remove("oculto");
  document.body.style.overflow = "hidden";
}

function ocultarCarrito() {
  document.getElementById("carrito").classList.add("oculto");
  document.getElementById("opacity").classList.add("oculto");
  document.body.style.overflow = "auto";
}

function truncarString(texto) {
  if (texto.length > 43) {
    return texto.substring(0, 43) + "...";
  } else {
    return texto;
  }
}

function crearProductoHtml(producto) {
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
          <p class="nombre pmz">${truncarString(nombre)}</p>
          <div class="eliminar" onclick="restarCompra();carrito.eliminarProducto(${id});mostrarProductosEnCarrito(carrito.productos);mostrarTotalEnCarrito(carrito)"></div>
        </div>
        <div class="linea">
          <div class="cantidad">
            <div class="menos boton" onclick="substraerEnCarrito(${id},carrito.productos);mostrarProductosEnCarrito(carrito.productos);mostrarTotalEnCarrito(carrito)">-</div>
            <div class="cantidad-actual">${cantidad}</div>
            <div class="mas boton"  onclick="incrementarEnCarrito(${id},carrito.productos);mostrarProductosEnCarrito(carrito.productos);mostrarTotalEnCarrito(carrito)">+</div>
          </div>
          <div class="precios"><p class="pmz">$${(precio * cantidad).toFixed(
    2
  )}</p></s></p></div>
        </div>
  `;

  hProducto.appendChild(hImagen);
  hProducto.appendChild(hInfo);
  return hProducto;
}

function mostrarProductosEnCarrito(productosCarrito) {
  const hCarrito = document.getElementById("productos-carrito");
  hCarrito.innerHTML = "";
  productosCarrito.forEach((producto) => {
    hCarrito.appendChild(crearProductoHtml(producto));
  });
}

function mostrarTotalEnCarrito(carrito) {
  const hTotalCarrito = document.getElementById("total-carrito");
  hTotalCarrito.textContent = `$${carrito.calcularTotal().toFixed(2)}`;
}

function substraerEnCarrito(id, productosCarrito) {
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
}

function restarCompra() {
  document.getElementById("compras").textContent =
    parseInt(document.getElementById("compras").textContent) - 1;
}

function incrementarEnCarrito(id, productosCarrito) {
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
}

function controlCarrito(e) {
  if (e.target.classList.contains("btn-agregar-carrito")) {
    mostrarProductosEnCarrito(carrito.productos);
    mostrarTotalEnCarrito(carrito);
    mostrarCarrito();
  } else {
    switch (e.target.id) {
      case "carrito-compras":
        mostrarProductosEnCarrito(carrito.productos);
        mostrarTotalEnCarrito(carrito);
        mostrarCarrito();
        break;
      case "cerrar-carrito":
        ocultarCarrito();
        break;

      case `opacity`:
        ocultarCarrito();
        break;

      case "ver-mas-productos":
        ocultarCarrito();

        break;
      default:
        break;
    }
  }
}

document.addEventListener("click", controlCarrito);
