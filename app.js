//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("Gracias por la compra");
    // Seleccionamos el contenedor de los elementos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    var items = carritoItems.getElementsByClassName('carrito-item2');
    
    // Creamos un array para almacenar los datos de los items del carrito
    var itemsData = [];

    // Variable para almacenar el total de la compra
    var totalCompra = 0;

    var usuario = document.querySelector('.usuario').value;
    var mesa = document.querySelector('.mesa').value;

    // Recorremos cada elemento del carrito para obtener su información
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var titulo = item.querySelector('.carrito-item-titulo').innerText;
        var cantidad = item.querySelector('.carrito-item-cantidad').value;
        var precio = item.querySelector('.carrito-item-precio').innerText.replace('$', '');
        var comentario = item.querySelector('.comentario').value;

        // Calculamos el subtotal del item
        var subtotal = parseFloat(precio) * parseInt(cantidad);
        
        // Creamos un objeto con los datos del item y lo agregamos al array
        var itemData = {
            "titulo": titulo,
            "cantidad": cantidad,
            "precio": precio,
            "comentario" : comentario,
            "subtotal": subtotal.toFixed(2) // Limitamos a 2 decimales para el subtotal
        };
        itemsData.push(itemData);

        // Incrementamos el total de la compra
        totalCompra += subtotal;
    }
    var compraData = {
        "usuario": usuario,
        "mesa": mesa,
        "items": itemsData,
        "total": document.querySelector('.carrito-precio-total').innerText
    };

    // Convertimos el total de la compra a formato de moneda
    var totalCompraFormat = '$' + totalCompra.toFixed(2);

    // Generamos el texto de la orden de compra
    var ordenTexto = '';
    for (var j = 0; j < itemsData.length; j++) {
        ordenTexto += `Producto: ${itemsData[j].titulo}\n`;
        ordenTexto += `Cantidad: ${itemsData[j].cantidad}\n`;
        ordenTexto += `Precio unitario: ${itemsData[j].precio}\n`;
        ordenTexto += `Nota: ${itemsData[j].comentario}\n`;
        ordenTexto += `Subtotal: ${itemsData[j].subtotal}\n\n`;
    }
    ordenTexto += `Usuario: ${usuario}\n`;
    ordenTexto += `N.- de mesa: ${mesa}\n`; 
    ordenTexto += `Total de la compra: ${totalCompraFormat}`;

    // Creamos el archivo JSON
    var jsonData = JSON.stringify(compraData);

    // Creamos el archivo de texto
    var textoBlob = new Blob([ordenTexto], {type: 'text/plain'});
    var textoUrl = URL.createObjectURL(textoBlob);
    var textoLink = document.createElement('a');
    textoLink.href = textoUrl;
    textoLink.download = 'orden_compra.txt';
    document.body.appendChild(textoLink);
    textoLink.click();
    document.body.removeChild(textoLink);
    URL.revokeObjectURL(textoUrl);

    // Creamos el archivo JSON
    var jsonBlob = new Blob([jsonData], {type: 'application/json'});
    var jsonUrl = URL.createObjectURL(jsonBlob);
    var jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = 'detalle_compra.json';
    document.body.appendChild(jsonLink);
    jsonLink.click();
    document.body.removeChild(jsonLink);
    URL.revokeObjectURL(jsonUrl);

    // Enviar los datos JSON al servidor utilizando AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "guardar_compra.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Datos enviados correctamente");
            // Aquí puedes hacer cualquier otra acción después de enviar los datos
        }
    };
    xhr.send(jsonData); // Suponiendo que 'jsonData' es tu variable que contiene el JSON


    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = parseFloat(item.getElementsByClassName('precio-item')[0].innerText.replace('$', '').replace(',', '.')).toFixed(2);

    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log("Aqui" , precio);
    console.log(imagenSrc);
    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';
    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
    var opciones =document.getElementsByClassName('ventana-opciones')[0];
    opciones.style.left = '25%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }
    
    var itemCarritoContenido = `
        <div class="carrito-item2">
            <div class="carrito-item">
                <img src="${imagenSrc}" width="80px" alt="">
                <div class="carrito-item-detalles">
                    <span class="carrito-item-titulo">${titulo}</span>
                    <div class="selector-cantidad">
                        <i class="fa-solid fa-minus restar-cantidad"></i>
                        <input type="text" value="1" class="carrito-item-cantidad" disabled>
                        <i class="fa-solid fa-plus sumar-cantidad"></i>
                    </div>
                    <span class="carrito-item-precio">${precio}</span>  
                </div>
                <button class="btn-eliminar">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <input type="text" name="comentario" placeholder="Agregar nota" class="comentario" required><br>
        </div>
    `

    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    for(var i = 0; i < carritoItems.length; i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace(',', '.')); // Reemplazar ',' por '.'
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = parseInt(cantidadItem.value); // Parsear la cantidad a entero
        console.log(precio);
        total += precio * cantidad;
    }

    total = total.toFixed(2); // Redondear el total a 2 decimales
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es");
}







