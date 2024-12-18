const productos = [
    {
        id: "remera-01",
    titulo: "Remera Negra",
    imagen: "./img/remeranegra.jpg",
    categoria: {
        nombre: "REMERAS",
        id: "remeras"
    },
    precio: 17400
    },
    {
        id: "remera-02",
        titulo: "Remera Blanca",
    imagen: "./img/remerablanca.jpg",
    categoria: {
        nombre: "REMERAS",
        id: "remeras"
    },
    precio: 17400
    },
    {
        id: "remera-03",
        titulo: "Remera Gris",
    imagen: "./img/remeragris.webp",
    categoria: {
        nombre: "REMERAS",
        id: "remeras"
    },
    precio: 19400
    },
    {
        id: "remera-04",
        titulo: "Remera Gris Oscura",
    imagen: "./img/remeragrisoscuro.jpg",
    categoria: {
        nombre: "REMERAS",
        id: "remeras"
    },
    precio: 18000
    },
    {
        id: "pantalon-01",
        titulo: "Pantalon Beige",
    imagen: "./img/pantalon.webp",
    categoria: {
        nombre: "PANTALONES",
        id: "pantalones"
    },
    precio: 45000
    },
    {
        id: "pantalon-02",
    titulo: "Pantalon Azul",
    imagen: "./img/pantalonazul.jpg",
    categoria: {
        nombre: "PANTALONES",
        id: "pantalones"
    },
    precio: 51000
    },
    {
        id: "pantalon-03",
    titulo: "Pantalón Gabardina",
    imagen: "./img/pantalongabardina.webp",
    categoria: {
        nombre: "PANTALONES",
        id: "pantalones"
    },
    precio: 55000
    },
    {
        id: "pantalon-04",
    titulo: "Pantalón Negro",
    imagen: "./img/pantalonnegro.webp",
    categoria: {
        nombre: "PANTALONES",
        id: "pantalones"
    },
    precio: 30000
    },
    {
        id: "buzo-01",
    titulo: "Buzo Estampado",
    imagen: "./img/buzoestampado.webp",
    categoria: {
        nombre: "BUZOS",
        id: "buzos"
    },
    precio: 57000
    },
    {
    
        id: "buzo-02",
    titulo: "Buzo Gris",
    imagen: "./img/buzogris.jpg",
    categoria: {
        nombre: "BUZOS",
        id: "buzos"
    },
    precio: 37000
    },
    {
    
        id: "buzo-03",
    titulo: "Buzo Negro",
    imagen: "./img/buzonegro.webp",
    categoria: {
        nombre: "BUZOS",
        id: "buzos"
    },
    precio: 51000
    },
    {
        id: "buzo-04",
    titulo: "Buzo celeste",
    imagen: "./img/buzoceleste.png",
    categoria: {
        nombre: "BUZOS",
        id: "buzos"
    },
    precio: 33000
    },
    
]
const contenedorProductos = document.querySelector("#contenedor-productos")
const botonesCategoria = document.querySelectorAll(".boton-categoria")
const tituloPrincipal = document.querySelector("#titulo-principal")
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numerito = document.querySelector("#numerito");

function cargarProductos (productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div")
        div.classList.add("producto");
        div.innerHTML = `
                    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button id="${producto.id}" class="producto-agregar">Agregar</button>
                    </div>
        `
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar()
}
cargarProductos(productos)

botonesCategoria.forEach(boton => {
    boton.addEventListener("click",(e)=>{

        botonesCategoria.forEach(boton =>boton.classList.remove("active"))
        e.currentTarget.classList.add("active")

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton)
        }else {
            tituloPrincipal.innerText = "TODOS LOS PRODUCTOS"
            cargarProductos(productos)
        }
        

    })
    
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar")


botonesAgregar.forEach(boton=>{
    boton.addEventListener("click",agregarAlCarrito);
})
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

