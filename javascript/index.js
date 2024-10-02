const carrito = new Carrito();

const producto1 = new Producto(
  "Disco Duro Externo Portátil WD 2TB Elements - USB 3.0",
  64,
  "Compatibilidad con USB 3.0 y USB 2.0 Transferencias rápidas de datos Mejora el rendimiento del PC Gran capacidad; Compatibilidad Formateado en NTFS para Windows 10, Windows 8.1, Windows 7; Es posible que se necesite volver a formatear para otros sistemas operativos; La compatibilidad puede variar según la configuración del hardware y el sistema operativo del usuario.",
  "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  "electrónica"
);

const producto2 = new Producto(
  "SanDisk SSD PLUS 1TB SSD Interno - SATA III 6 Gb/s",
  109,
  "Actualización fácil para un inicio más rápido, apagado, carga y respuesta de aplicaciones (en comparación con un disco duro SATA de 5400 RPM de 2.5 pulgadas; Basado en especificaciones publicadas y pruebas internas de referencia utilizando puntuaciones de PCMark vantage) Aumenta el rendimiento de escritura en ráfagas, haciéndolo ideal para cargas de trabajo típicas de PC El equilibrio perfecto entre rendimiento y fiabilidad Velocidades de lectura/escritura de hasta 535MB/s/450MB/s (Basado en pruebas internas; El rendimiento puede variar según la capacidad de la unidad, el dispositivo host, el sistema operativo y la aplicación.)",
  "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  "electrónica"
);

const producto3 = new Producto(
  "Silicon Power SSD 3D NAND de 256GB A55 SLC Cache Performance Boost SATA III 2.5",
  80,
  "Se aplica flash 3D NAND para ofrecer altas velocidades de transferencia Velocidades de transferencia notables que permiten un arranque más rápido y un rendimiento general del sistema mejorado. La avanzada tecnología SLC Cache permite un impulso de rendimiento y una vida útil más larga Diseño delgado de 7 mm adecuado para Ultrabooks y portátiles ultra delgados. Soporta comandos TRIM, tecnología de recolección de basura, RAID y ECC (Corrección y Comprobación de Errores) para proporcionar un rendimiento optimizado y una fiabilidad mejorada.",
  "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
  "electrónica"
);

const producto4 = new Producto(
  "Unidad de Estado Sólido Interna WD Blue 3D NAND SATA SSD de 1TB",
  140,
  "Alto rendimiento y gran capacidad para aplicaciones intensivas de múltiples tareas y videojuegos. Mejora el rendimiento de tu sistema con capacidades superiores de almacenamiento y durabilidad. Las unidades de estado sólido WD Blue 3D NAND SATA SSD usan la tecnología 3D NAND no solo para las capacidades más altas (hasta 4TB) que las generaciones anteriores de SSD WD Blue, sino también para ayudar a reducir la interferencia celular.",
  "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
  "electrónica"
);

const producto5 = new Producto(
  "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
  500,
  "Pantalla IPS panorámica Full HD (1920 x 1080) de 21, 5 pulgadas y tecnología de sincronización gratuita Radeon. No es compatible con montaje VESA Frecuencia de actualización: 75 Hz - Uso del puerto HDMI Diseño de marco cero | ultradelgado | Tiempo de respuesta de 4 ms | Aspecto del panel IPS Relación: 16: 9. Color admitido: 16, 7 millones de colores Brillo: 250 nit Ángulo de inclinación: 5 grados a 15 grados Ángulo de visión Horizontal: 178 grados Ángulo de visión Vertical: 178 grados 75 hercios",
  "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  "electrónica"
);

const producto6 = new Producto(
  "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
  999.99,
  "MONITOR PARA JUEGOS CURVO 32:9 SÚPER ULTRAANCHO DE 49 PULGADAS con pantalla dual de 27 pulgadas una al lado de la otra TECNOLOGÍA QUANTUM DOT (QLED), compatibilidad con HDR y calibración de fábrica que proporciona colores y contraste increíblemente realistas y precisos ALTA FRECUENCIA DE ACTUALIZACIÓN de 144 HZ y tiempo de respuesta ultrarrápido de 1 ms para trabajar elimine el desenfoque de movimiento, las imágenes fantasma y reduzca el retraso de entrada",
  "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
  "electrónica"
);

const contenedorProductos = document.getElementById("contenedor-productos");
const compras = document.getElementById("compras");
let indiceId = 1;
const productosArreglo = [];
productosArreglo.push(producto1);
productosArreglo.push(producto2);
productosArreglo.push(producto3);
productosArreglo.push(producto4);
productosArreglo.push(producto5);
productosArreglo.push(producto6);

function cargarProductosPaginaPrincipal(
  idContenedorHtml,
  arrayProductos,
  carritoDeCompras
) {
  const htmlContenedor = document.getElementById(idContenedorHtml);
  arrayProductos.forEach((producto) => {
    const { id, nombre, imagen, descripcion, precio, categoria } = producto;
    const hCardProducto = document.createElement("artcle");
    const hNombre = document.createElement("h4");
    const hImagen = document.createElement("img");
    const hDescripcion = document.createElement("p");
    const hCantidad = document.createElement("div");
    const hPrecio = document.createElement("p");
    const btnAgregarAlCarrito = document.createElement("button");
    
    hCardProducto.classList.add("tarjeta-Producto");
    // pvp -> producto vista principal
    hCardProducto.id = `pvp${id}`;

    hNombre.textContent = nombre;
    hNombre.classList.add("nombre-producto");

    hImagen.src = imagen;
    hImagen.alt = nombre;

    hDescripcion.textContent = descripcion;
    hCantidad.classList.add("contenedor-cantidad");
    hCantidad.innerHTML = `<label class="cantidad">Cantidad</label><select class="cantidad" name="cantidad" id=${indiceId++}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>`;

    hPrecio.textContent = `$${precio} Dolares`;

    btnAgregarAlCarrito.id = `add${id}`;
    btnAgregarAlCarrito.classList.add("btn-agregar-carrito");
    const manejarAgregarAlCarrito = () => {
      carritoDeCompras.agregarProducto(
        new Producto(nombre, precio, descripcion, imagen, categoria, 1, id)
      );
    };
    btnAgregarAlCarrito.addEventListener("click", manejarAgregarAlCarrito);

    hCardProducto.appendChild(hNombre);
    hCardProducto.appendChild(hImagen);
    hCardProducto.appendChild(hDescripcion);
    hCardProducto.appendChild(hCantidad);
    hCardProducto.appendChild(hPrecio);
    hCardProducto.appendChild(btnAgregarAlCarrito);

    htmlContenedor.appendChild(hCardProducto);
  });
}

window.onload = cargarProductosPaginaPrincipal(
  "contenedor-productos",
  productosArreglo,
  carrito
);
