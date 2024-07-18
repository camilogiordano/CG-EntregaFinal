document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
    actualizarNuevoCarrito();

    document.getElementById('comprar-todo').addEventListener('click', comprarTodo);
});

function mostrarCarrito() {
    let memoria = JSON.parse(localStorage.getItem("productos")) || [];
    const container = document.getElementById('carrito-container');
    container.innerHTML = '';

    memoria.forEach((producto, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.style.maxWidth = '540px';

        card.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.nombre}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text"><small class="text-body-secondary">Precio: $${producto.precio}</small></p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button class="btn btn-secondary" onclick="restarCantidad(${index})">-</button>
                                <span class="btn btn-light">${producto.cantidad}</span>
                                <button class="btn btn-secondary" onclick="sumarCantidad(${index})">+</button>
                            </div>
                            <button class="btn btn-danger" onclick="eliminarProducto(${index})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function sumarCantidad(index) {
    let memoria = JSON.parse(localStorage.getItem("productos")) || [];
    memoria[index].cantidad++;
    localStorage.setItem("productos", JSON.stringify(memoria));
    mostrarCarrito();
    actualizarNuevoCarrito();
}

function restarCantidad(index) {
    let memoria = JSON.parse(localStorage.getItem("productos")) || [];
    if (memoria[index].cantidad > 1) {
        memoria[index].cantidad--;
    } else {
        memoria.splice(index, 1);
    }
    localStorage.setItem("productos", JSON.stringify(memoria));
    mostrarCarrito();
    actualizarNuevoCarrito();
}

function eliminarProducto(index) {
    let memoria = JSON.parse(localStorage.getItem("productos")) || [];
    memoria.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(memoria));
    mostrarCarrito();
    actualizarNuevoCarrito();
}

function actualizarNuevoCarrito() {
    let memoria = JSON.parse(localStorage.getItem("productos")) || [];
    let cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    document.getElementById("carritocuenta").textContent = cuenta;
}

function comprarTodo() {
    let memoria = JSON.parse(localStorage.getItem("productos")) || [];
    if (memoria.length > 0) {
        Swal.fire({
            title: "Gracias por tu compra",
            text: "Nos contactaremos a la brevedad.",
            imageUrl: "https://scontent.flpg1-1.fna.fbcdn.net/v/t31.18172-8/10849001_1533850976882438_7965804757887488792_o.jpg?_nc_cat=106&ccb=1-7&_nc_sid=b895b5&_nc_ohc=CAJK9iGC7mAQ7kNvgF7Vluy&_nc_ht=scontent.flpg1-1.fna&cb_e2o_trans=t&oh=00_AYAVDlly5x3kcdsZrTHn8n-PnO1irc5F94FIWxEz8Ytkqw&oe=66C0EE88",
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: "Custom image"
            });
        localStorage.removeItem("productos");
        mostrarCarrito();
        actualizarNuevoCarrito();
    } else {
        alert("El carrito está vacío");
    }
}