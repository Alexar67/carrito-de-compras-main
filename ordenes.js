// Función para cargar las órdenes desde el servidor
function cargarOrdenes() {
    fetch('consulta.php')
        .then(response => response.json())
        .then(ordenes => {
            // Crear una lista de órdenes en formato HTML
            const ordenesHTML = ordenes.map(orden => {
                // Parsear la cadena JSON de items en un array de objetos
                const items = JSON.parse(orden.items);

                return `<div class="orden">
                            <p>ID: ${orden.id}</p>
                            <p>Usuario: ${orden.usuario}</p>
                            <p>Mesa: ${orden.mesa}</p>
                            <p>Items:</p>
                            <ul class="items-list">
                                ${items.map(item => (
                                    `<li class="item">
                                        <p>Título: ${item.titulo}</p>
                                        <p>Precio: ${item.precio}</p>
                                        <p>Cantidad: ${item.cantidad}</p>
                                        <p>Subtotal: ${item.subtotal}</p>
                                        <p>Comentario: ${item.comentario}</p>
                                    </li>`
                                )).join('')}
                            </ul>
                            <p>Total: ${orden.total}</p>
                            <p>Estado: ${orden.estado}</p>
                        </div>`;
            }).join('');

            // Mostrar las órdenes en el elemento con id 'ordenes'
            document.getElementById('ordenes').innerHTML = ordenesHTML;
        })
        .catch(error => console.error('Error al cargar las órdenes:', error));
}

// Llamar a la función para cargar las órdenes al cargar la página
cargarOrdenes();