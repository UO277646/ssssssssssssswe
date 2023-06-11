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
 <h1>Consultas a la base</h1>
 <form action='#' method='post' >
 
 <label for=nom>Introduzca un nombre de usuario</label>
 <input type='text' name='nombre' id = 'nom'>
 <label for=con>Introduzca una contraseña</label>
 <input type='text' name='con' id = 'con'>
 
 <input type='submit' name='ver'  value='Ver presupuesto' >
 

 
 
 
 </form>
 

 </body>
</html>";
class BaseDatos{

    private $sqli;
    

    public function __construct(){

    }
    public function verAccion($nombre,$contraseña){
        $this->sqli=new mysqli("localhost","DBUSER2022","DBPSWD2022","centralita");
        $query=$this->sqli->prepare("SELECT id_usuario from Usuario WHERE nombre=? and contraseña=?");
        $query->bind_param('ss',$nombre,$contraseña);
        $query->execute();
		$query->store_result();
        $query->bind_result($id);
		$query->fetch();
        $query2=$this->sqli->prepare("SELECT total from Presupuesto WHERE id_usuario=?");
        $query2->bind_param('s',$id);
        $query2->execute();
        $query2->bind_result($precio);
		$query2->fetch();
        if(!empty($precio)){
            echo "<section>
                <h2>Presupuesto :</h2>
                <p>El usuario tiene un total en reservas de : $precio euros</p>
            </section>";
        }
        // crear un presupuesto para ese id con total 0

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

        if(isset($_POST['ver'])){
            $_SESSION['base']->verAccion($_POST['nombre'],$_POST['con']);
        }

        
    }
   

    
?>