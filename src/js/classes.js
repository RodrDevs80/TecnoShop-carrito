

class App {
  constructor(productos = [], carrito = []) {
    this.productos = productos;
    this.carrito = carrito;
  }
  obtenerProducto(idProducto) {
    return this.productos.find((p) => p.id == idProducto);
  }
}

class Producto {
  constructor(
    nombre,
    precio,
    descripcion = "",
    imagen,
    categoria = "electrónica",
    cantidad = 1,
    id = undefined
  ) {
    if (id == undefined) {
      this.id = (Math.random() * 1000).toFixed() * (Math.random() * 15).toFixed();
    } else {
      this.id = id;
    }
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.categoria = categoria;
  }

  // calcular el subtotal de un producto
  calcularSubtotal() {
    return this.precio * this.cantidad;
  }
}

class Carrito {
  constructor() {
    this.productos = []; // Arreglo para almacenar los productos del carrito
  }

  agregarProducto(producto) {
    this.productos.push(producto);
  }

  eliminarProducto(id) {
    this.productos = this.productos.filter((producto) => producto.id !== id);
  }

  vaciarCarrito() {
    this.productos = [];
  }

  calcularTotal() {
    let total = 0;
    this.productos.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });
    return total;
  }
  //para depurar
  mostrarProductos() {
    if (this.productos.length !== 0) {
      this.productos.forEach((producto) =>
        console.log(
          `El ${producto.nombre} tiene un precio de $${producto.precio
          } por unidad\nCantidad: ${producto.cantidad} ${producto.descripcion.length != 0
            ? producto.descripcion
            : "No hay descripción disponible"
          }`
        )
      );
    } else {
      console.log("No hay productos en el carrito");
    }
  }
}
