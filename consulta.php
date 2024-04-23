<?php
// Conectarse a la base de datos
$conexion = new mysqli('localhost', 'alex', 'sponja1234', 'PEDIDOS');

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Consulta SQL para obtener los datos de la tabla 'ordenes'
$sql = "SELECT * FROM ORDENES";

// Ejecutar la consulta
$resultado = $conexion->query($sql);

// Verificar si hay resultados
if ($resultado->num_rows > 0) {
    // Crear un array para almacenar los datos de las órdenes
    $ordenes = array();

    // Iterar sobre los resultados y agregarlos al array de órdenes
    while ($fila = $resultado->fetch_assoc()) {
        // Agregar la fila al array de órdenes
        $ordenes[] = $fila;
    }

    // Convertir el array de órdenes a formato JSON y mostrarlo
    echo json_encode($ordenes);
} else {
    // No hay resultados
    echo "0 resultados";
}

// Cerrar la conexión
$conexion->close();
?>
