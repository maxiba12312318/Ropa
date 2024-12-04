const carrito = []

const contenedorProductos = document.getElementById("contenedor-productos")

const renderizarProductos = (array) =>{
    array.forEach(elm => {

        const div = document.createElement("div")

        div.classList.add("producto")

        div.innerHTML= `
        <h3>${elm.nombre}</h3>
        <p>$${elm.precio}</p>
        <img src="${elm.img}">
        <button id="agregar${elm.id}">Comprar</button>
        `
        contenedorProductos.appendChild(div)

        const boton = document.getElementById(`agregar${elm.id}`)
        boton.addEventListener("click",()=>{
            agregarCarrito(elm.id)
            console.log(carrito);
            
        })
    });
}
const agregarCarrito = (id)=>{
    const producto = productos.find((prod) =>prod.id ===id)

    if(carrito.some((prd)=>prd.id===id)){
        
        const index = carrito.findIndex((prd)=>prd.id===id)
            carrito[index].cantidad++
    }
    else{
    producto.cantidad=1
    carrito.push(producto)
    }
    guardarCarrito()
}

const guardarCarrito = () => {
    localStorage.setItem("carrito",JSON.stringify(carrito))
}

renderizarProductos(productos)





