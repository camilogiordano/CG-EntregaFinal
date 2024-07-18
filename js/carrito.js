document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
    actualizarNuevoCarrito();
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
