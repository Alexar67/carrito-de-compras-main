<?php
class conexion {
    // Variables publicas
    public string $MySQL_host;
    public string $MySQL_user;
    public string $MySQL_passwd;
    public string $MySQL_dbname;
    public $connection;

    function __construct()
     {
      $this->MySQL_host = 'localhost';        
      $this->MySQL_user = 'alex';   
      $this->MySQL_passwd = 'Sponja1997.5'; 
      $this->MySQL_dbname = 'DATOS';
      // Creates a connection to the database
      $this->connection = $this->connect();
    
     }

     function connect() 
      {
        // Create connection
       // echo "Ingreso a connect()";
        $conn = mysqli_connect($this->MySQL_host, $this->MySQL_user, $this->MySQL_passwd , $this->MySQL_dbname);
        // Check connection
        if (!$conn) {
           die("Connection failed: " . mysqli_connect_error());
           }
          echo "Connected successfully"; 
        	return $conn;
           }
    
    function query ( $sentence )
      {
     if ($result=mysqli_query($this->connection, $sentence)) {
       echo 'Query Successfully';
      } else {
       echo "Error: " . $sql . "<br>" . mysqli_error($conn);
             }
         return $result; 
      }

    function insertar($t,$h,$d)
         {
      //echo "Ingreso a insertar";
      $sql = "INSERT INTO SENSORES (id,temperatura,humedad,voltaje) VALUES (NULL, ' " .$t." ', ' ".$h." ', ' ".$d. "')";
      //$sql = "INSERT INTO sensores (id, temperatura, humedad, voltaje) VALUES (NULL , '2', '2', '2')";

      if($result=$this->query( $sql )){
        echo "Se realizo el registro";
	}
      else
           {
       echo "Error al insertar";
 
        }
      return $result;
     }
    function cerrar_conexion(){
        //mysqli_close($conn);
        if (mysqli_close($this->connection)){
            echo "Se cierra";
        }
        
    }

}
?>