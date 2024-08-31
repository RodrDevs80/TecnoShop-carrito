class Carrito {
    constructor() {
        this.productos = []; // Arreglo para almacenar los productos del carrito
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(producto => producto.id !== id);
    }

    vaciarCarrito() {
        this.productos = [];
    }

    calcularTotal() {
        let total = 0;
        this.productos.forEach(producto => {
            total += producto.precio * producto.cantidad;
        });
        return total;
    }

    //para depurar
    mostrarProductos() {
        if (this.productos.length !== 0) {
            this.productos.forEach((producto) => console.log(`El ${producto.nombre} tiene un precio de $${producto.precio} por unidad\nCantidad: ${producto.cantidad} ${producto.descripcion.length != 0 ? producto.descripcion : 'No hay descripción disponible'}`));
        } else {
            console.log('No hay productos en el carrito');
        }

    }
}

