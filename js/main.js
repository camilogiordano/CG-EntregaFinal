
function agregarAlCarrito(item) {
    let memoria = JSON.parse(localStorage.getItem("productos")) || [];
    let nuevoItem = getNuevoProductoParaMemoria(item);
    
    let indiceProducto = memoria.findIndex(prod => prod.nombre === nuevoItem.nombre);

    if (indiceProducto === -1) {
        memoria.push(nuevoItem);
    } else {
        memoria[indiceProducto].cantidad++;
    }

    localStorage.setItem("productos", JSON.stringify(memoria));
    actualizarNuevoCarrito();
}

function getNuevoProductoParaMemoria(item) {
    let nuevoItem = {
        nombre: item.nombre,
        img: item.img,
        descripcion: item.descripcion,
        precio: item.precio,
        cantidad: 1
    };
    return nuevoItem;
}

function actualizarNuevoCarrito() {
    let memoria = JSON.parse(localStorage.getItem("productos")) || [];
    let cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    document.getElementById("carritocuenta").textContent = cuenta;
}

fetch('')
    .then((response)=> response.json())
    .then((datos)=> console.log(datos))
    .catch((error)=> console.log(error));


class Producto {
    constructor(nombre, img, descripcion, precio) {
        this.nombre = nombre;
        this.img = img;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

let productos = [
    new Producto("Escultura Plastilina", "../assets/escultura-1.png", "Escultura hecha con un rejunte de diferentes trabajos viejos.", 25000 ),
    new Producto("Lámpara Heffer", "../assets/escultura-2.png", "Lámpara de La vida moderna de Rocko - Personaje Heffer", 58000 ),
    new Producto("Lámpara Radiohead", "../assets/escultura-3.png", "Escultura con luz interna del álbum The Bends de Radiohead", 45000)
];






document.addEventListener("DOMContentLoaded", () => {
    const template = document.querySelector('template');
    const containerCards = document.querySelector("#container");

    productos.forEach((producto) => {
        const plantilla = template.content.cloneNode(true);

        plantilla.querySelector(".img-fluid").src = producto.img;
        plantilla.querySelector('h5').textContent = producto.nombre;
        plantilla.querySelector('.card-text').textContent = producto.descripcion;
        plantilla.querySelector('.card-text2').textContent = `Precio: $${producto.precio}`;

        plantilla.querySelector('button').addEventListener("click", () => agregarAlCarrito(producto));

        containerCards.appendChild(plantilla);
    });

    actualizarNuevoCarrito();
});

actualizarNuevoCarrito();

