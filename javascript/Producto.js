class Producto {
  constructor(
    nombre,
    precio,
    descripcion = "",
    imagen,
    categoria = "electrónica",
    cantidad = 1
  ) {
    if (typeof nombre !== "string") {
      throw new Error("El nombre debe ser un string");
    }
    if (typeof precio !== "number" || isNaN(precio)) {
      throw new Error("El precio debe ser un número");
    }
    if (typeof descripcion !== "string") {
      throw new Error("La descripción debe ser un string");
    }
    if (typeof categoria !== "string") {
      throw new Error("La categoría debe ser un string");
    }
    if (typeof imagen !== "string") {
      throw new Error("La imagen debe ser un string");
    }
    if (typeof cantidad !== "number" || isNaN(cantidad) || cantidad < 0) {
      throw new Error("La cantidad debe ser un número entero positivo");
    }

    this.id = (Math.random() * 1000).toFixed() * (Math.random() * 15).toFixed();

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
