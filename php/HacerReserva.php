<?php
session_start();
echo "<!DOCTYPE HTML>
<html lang='es'>
<head>
        <!-- Datos que describen el documento -->
        <meta charset='UTF-8' />
        <title>Presupuesto </title>
        
        <meta name='author' content='Juan Dominguez' />
        <meta name='keywords' content='javascript' />
        <meta name ='viewport' content ='width=device-width, initial scale=1.0' />
        <meta name='description' content='Pagina principal' />
        <link rel='stylesheet' type='text/css' href='../estilo/estilo.css'/>
        
</head>
<body>
 <h1>Pagina de reservas</h1>
 <nav>
    <p>
        <a title= 'Pagina principal' tabindex='1' accesskey='T' href='../index.html'>Pagina principal</a>
    </p>
    <p>
        <a title= 'Gastronomia' tabindex='2' accesskey='C' href='../gastronomia.html'>Gastronomia</a>
    </p>
    <p>
        <a title= 'Meteorologia' tabindex='3' accesskey='D' href='../meteorologia.html'>Meteorologia</a>
    </p>
    <p>
        <a title= 'Juego' tabindex='4' accesskey='P' href='../juego.html'>Juego</a>
    </p>
    <p>
        <a title= 'Reserva' tabindex='5' accesskey='G' href='../php/HacerReserva.php'>Reserva</a>
    </p>
    <p>
        <a title= 'Rutas' tabindex='6' accesskey='Y' href='../xml/rutas.html'>Rutas</a>
    </p>

</nav>
 <section>
 <h2>Lista de recursos turisticos</h2>
 <ol>
                <li>Ruta del aguilar</li>

                <li>Ruta de los miradores</li>

                <li>Sidreria Taperia El Centro</li>

                <li>Mesón El Carbayu</li>

                <li>Casa Zoilo</li>

                <li>Restaurante Opera</li>

                <li>La Xana del Caballar</li>

                <li>Bar Casa Julio</li>

                <li>Hotel Rural Playa de Aguilar</li>
                
                <li>HOTEL BOUTIQUE VILLA DEL MARQUÉS</li>
</ol>
 </section>
 <form action='#' method='post' >
 <p>
 <label for=nom>Introduzca un nombre de usuario</label>
 <input type='text' name='nombre' id = 'nom'>
 <label for=con>Introduzca una contraseña</label>
 <input type='text' name='con' id = 'con'>
 </p>
 <p>
 <label for=day>Seleccione dia de este mes</label>
 <input type='number' name='day' id='day' min='1' max='31' step='1'>
 </p>
 <p>
 <label for=hour>Seleccione hora del dia</label>
 <input type='number' name='hour' id='hour' min='0' max='23' step='1'>
 </p>
 <p>
 <label for=min>Seleccione minutos</label>
 <input type='number' name='min' id='min' min='0' max='59' step='1'>
 </p>
 <p>
 <label for=rec>Selecione numero de recurso (1-10)</label>
 <input type='number' name='rec' id='rec' min='1' max='10' step='1'>
 </p>
 <input type='submit' name='reservar'  value='Reservar' >
 

 
 
 
 </form>
 

 </body>
</html>";
class BaseDatos{

    private $sqli;
    

    public function __construct(){

    }

    public function reservar($nombre,$contraseña,$dia,$hora,$minutos,$recurso){
        $this->sqli=new mysqli("localhost","DBUSER2022","DBPSWD2022","centralita");
         $query=$this->sqli->prepare("SELECT id_usuario from Usuario WHERE nombre=? and contraseña=?");
        
        $query->bind_param('ss',$nombre,$contraseña);
        $query->execute();
		$query->store_result();
        $query->bind_result($idusuario);
		$query->fetch(); 
        if(empty($idusuario)){
            echo "<section>
                <h2>Error</h2>
                <p>El usuario especificado no existe o hay error en credenciales</p>
            </section>";
        }
        else{
            //Comprobar ocupacion
            $queryLimitacion=$this->sqli->prepare("SELECT limitacion from DetallesRecurso WHERE id_recurso=?");
            $queryLimitacion->bind_param('s',$recurso );
            $queryLimitacion->execute();
            $queryLimitacion->store_result();
            $limitacion =0;
            $queryLimitacion->bind_result($limitacion);
            $queryLimitacion->fetch(); 
            if( $limitacion==0){
                echo "<section>
                <h2>Error</h2>
                <p>No hay sitio de reserva</p>
                </section>";
            }else{//Ocupacion comprobada
                $query2=$this->sqli->prepare("INSERT INTO Reserva VALUES(?,?,?,?,?,?)");
                $valorid= $this->buscarUltimoId()+1;
                $query2->bind_param('ssssss',$valorid,$recurso,$idusuario,$dia,$hora,$minutos  );
                $query2->execute();
                $this->actualizarPresupuestoCliente($idusuario,$recurso);
                $queryUpdate=$this->sqli->prepare("
                UPDATE DetallesRecurso SET limitacion=? WHERE id_recurso=?
                ");
                $limitacion=$limitacion-1;
                $queryUpdate->bind_param('is',$limitacion,$recurso);
                $queryUpdate->execute();
            }
            
        }

    }
    public function buscarUltimoId(){
        $query=$this->sqli->query("SELECT id_reserva from Reserva WHERE id_reserva=(SELECT MAX(id_reserva) FROM Reserva)");
        if($query->num_rows>0){
            $row=$query->fetch_assoc();
            return $row['id_reserva'];
        }else{
            return 0;
        }
    }
    public function actualizarPresupuestoCliente($idu,$rec){
        $query=$this->sqli->prepare("SELECT precio from Recurso WHERE id_recurso=?");
        $query->bind_param('s',$rec );
		$query->execute();
		$query->store_result();
        $precio =0;
        $query->bind_result($precio);
		$query->fetch(); 
        $query2=$this->sqli->prepare("SELECT total from Presupuesto WHERE id_usuario=?");
        $query2->bind_param('s',$idu);
        $query2->execute();
		$query2->store_result();
        $precio2 =0;
        $query2->bind_result($precio2);
		$query2->fetch(); 
        $precio3=$precio2+$precio;
        $queryUpdate=$this->sqli->prepare("
                UPDATE Presupuesto SET total=? WHERE id_usuario=?
            ");
        $queryUpdate->bind_param('is',$precio3,$idu);
        $queryUpdate->execute();
    }

}
$base;
    if(isset($__SESSION['base'])){
        $base=new BaseDatos();
        $_SESSION['base']=$base;
    }else{
        $base=new BaseDatos();
        $_SESSION['base']=$base ;
    }
    

    if(count($_POST)>0){

        if(isset($_POST['reservar'])){
            $_SESSION['base']->reservar($_POST['nombre'],$_POST['con'],$_POST['day'],$_POST['hour'],$_POST['min'],$_POST['rec']);
        }

        
    }
   

    
?>