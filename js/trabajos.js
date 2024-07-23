boton.addEventListener('click', ()=>{
    container.innerHTML = ''

    fetch('datos.json')
    .then((response)=> response.json())
    .then((datos)=> console.log(datos))
    .catch((error)=> console.log(error))
})