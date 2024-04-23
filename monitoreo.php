<?php
include_once ("class_conexion.php");
$a= new conexion();
$a->insertar($_POST['Temperatura'],$_POST['Humedad'],$_POST['Voltaje']);
$a->cerrar_conexion();
?>