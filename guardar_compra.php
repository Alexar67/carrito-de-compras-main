<?php
// Conectarse a la base de datos
$conexion = new mysqli('localhost', 'alex', 'sponja1234', 'PEDIDOS');

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener los datos enviados por el cliente (el archivo JSON)
$datos_json = file_get_contents('php://input');

// Decodificar el JSON para obtener un array asociativo
$datos = json_decode($datos_json, true);

// Extraer los elementos del pedido del array de datos
$items_pedido = $datos['items'];

// Convertir los elementos del pedido nuevamente a formato JSON
$items_pedido_json = json_encode($items_pedido);

// Convertir el total a un formato compatible con la base de datos
$total = str_replace('$', '', $datos['total']); // Eliminar el símbolo de dólar
$total = str_replace(',', '', $total); // Eliminar las comas
$total = floatval($total); // Convertir a float

// Escapar los datos para evitar inyección SQL (recomendado)
$items = mysqli_real_escape_string($conexion, $items_pedido_json);
$total = mysqli_real_escape_string($conexion, $total);
$usuario = mysqli_real_escape_string($conexion, $datos['usuario']); // Obtener el usuario del JSON
$mesa = intval($datos['mesa']);

// Insertar los datos en la base de datos
$sql = "INSERT INTO ORDENES (usuario, mesa, items, total) VALUES ('$usuario', $mesa, '$items', $total)";

if ($conexion->query($sql) === TRUE) {
    echo "Los datos fueron ingresados correctamente";
} else {
    echo "Error al insertar datos: " . $conexion->error;
}

// Cerrar la conexión
$conexion->close();
?>
