const carrito = new Carrito();
let carritoLs =  localStorage.getItem("carrito")
if (carritoLs) {
  JSON.parse(carritoLs).forEach((p) => {
    carrito.agregarProducto(p)
  });
}

const productos = [
  new Producto(
    "Procesador Intel Core i9-14900",
    640,
    "Intel Core I9 I9-14900 - 2 Ghz - 24 Núcleos - 32 Hilos - 36 Mb Caché - Fclga1700 Socket - Caja",
    "https://microglobalpromos.com.ar/2024/img/082024/BX8071514900_01.jpg",
    "electrónica"
  ),

  new Producto(
    "SanDisk SSD PLUS 1TB SSD Interno - SATA III 6 Gb/s",
    109,
    "Actualización fácil para un inicio más rápido, apagado, carga y respuesta de aplicaciones.",
    "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    "electrónica"
  ),

  new Producto(
    "Disco Solido Interno Western Digital 1TB Red SATA SA500",
    280,
    "Wd Red Sa500 Wds100t1r0a - Ssd - 1 Tb - Interno - 2.5 - Sata 6gb/s",
    "https://cdn.cs.1worldsync.com/3b/dd/3bdd97d3-e1fd-4f10-941d-ea87b0e68b11.jpg",
    "electrónica"
  ),
  new Producto(
    "Disco Solido Interno Kingston 250GB NV2 PCIE NVME M2",
    140,
    "Kingston Nv2 - Ssd - 250 Gb - Interno - M.2 2280 - Pcie 4.0 X4 (nvme) - Para Intel Next Unit Of Computing 12 Pro Kit - Nuc12wski5",
    "https://microglobalpromos.com.ar/2022/img/092022/SNV2S-250G_3.jpg",
    "electrónica"
  ),
  new Producto(
    "Monitor Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    500,
    "Pantalla IPS panorámica Full HD (1920 x 1080) de 21, 5 pulgadas y tecnología de sincronización gratuita Radeon",
    "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    "electrónica"
  ),
  new Producto(
    "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    999.99,
    "MONITOR PARA JUEGOS CURVO 32:9 SÚPER ULTRAANCHO DE 49 PULGADAS con pantalla dual de 27",
    "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    "electrónica"
  ),
  new Producto(
    "HDD 1T WD 3.5 PURPLE ",
    87.52,
    "Wd Purple Wd11purz - Disco Duro - 1 Tb - Interno - 3.5 - Sata 6gb/s - Búfer: 64 Mb",
    "https://cdn.cs.1worldsync.com/9e/38/9e38b204-3ee8-45ef-ab12-bead8040712a.jpg",
    "electrónica"
  ),
  new Producto(
    "Disco Solido Interno Western Digital 500GB 3D Blue Sata",
    86.61,
    "Wd Blue Sa510 Wds500g3b0a - Ssd - 500 Gb - Interno - 2.5 - Sata 6gb/s - Azul",
    "https://cdn.cs.1worldsync.com/73/22/732216cb-13fd-4898-9ee3-97a2da573db4.jpg",
    "electrónica"
  ),
  new Producto(
    "Memoria RAM Hiksemi Future 16GB DDR4 3200Mhz RGB ",
    57.99,
    "Marca Hiksemi, Capacidad: 16 GB DDR4 3200 Mhz RGB",
    "https://microglobalpromos.com.ar/2024/img/092024/HSC416U32C4%2016G_02.jpg",
    "electrónica"
  ),
];

function controlVistaPrincipal(
  idContenedorHtml,
  arrayProductos,
  carritoDeCompras
) {
  principal.cargarProductosPaginaPrincipal(
    idContenedorHtml,
    arrayProductos,
    carritoDeCompras
  );
}


function controlCarrito(e, carrito) {
  if (e.target.classList.contains("btn-agregar-carrito")) {
    asideMenu.mostrarProductosEnCarrito(carrito);
    asideMenu.mostrarTotalEnCarrito(carrito);
    asideMenu.open();
    localStorage.setItem('carrito', JSON.stringify(carrito.productos));
  } else {
    switch (e.target.id) {
      case "carrito-compras":
        asideMenu.mostrarProductosEnCarrito(carrito);
        asideMenu.mostrarTotalEnCarrito(carrito);
        asideMenu.open();
        break;
      case "cerrar-carrito":
        asideMenu.close();
        break;

      case `opacity`:
        asideMenu.close();
        break;

      case "ver-mas-productos":
        asideMenu.close();

        break;
      default:
        break;
    }
  }
  if (e.target.classList.contains("eliminar")){
    localStorage.setItem('carrito', JSON.stringify(carrito.productos));
  }
}

document.addEventListener("click", (e) => {
  controlCarrito(e, carrito);
});

function paymentControl(payment, carrito) {
  document.getElementById("realizar-compra").addEventListener("click", () => {
    if (carrito.productos.length == 0) {
      Swal.fire({
        title: "¡El carrito esta vacío! 🚨",
        text: "Agregue un producto para poder realizar la compra 🛒",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
    } else {
      payment.open();
      payment.loadingSkeleton();
      setTimeout(() => { payment.openChooseDeliveryMethod() }, 1000);
    }
  });
}
paymentControl(payment, carrito);

window.onload = controlVistaPrincipal(
  "contenedor-productos",
  productos,
  carrito
);




