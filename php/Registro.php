<?php
session_start();
echo "<!DOCTYPE HTML>
<html lang='es'>
<head>
        <!-- Datos que describen el documento -->
        <meta charset='UTF-8' />
        <title>Petroleo </title>
        
        <meta name='author' content='Juan Dominguez' />
        <meta name='keywords' content='javascript' />
        <meta name ='viewport' content ='width=device-width, initial scale=1.0' />
        <meta name='description' content='Pagina principal' />
        <link rel='stylesheet' type='text/css' href='../estilo/estilo.css'/>
        
</head>
<body>
 <h1>Registro usuario</h1>
 <form action='#' method='post' >
 
 <label for=nom>Introduzca un nombre de usuario</label>
 <input type='text' name='nombre' id = 'nom'>
 <label for=con>Introduzca una contraseña</label>
 <input type='text' name='con' id = 'con'>
 
 <input type='submit' name='crear'  value='Crear cuenta' >
 

 
 
 
 </form>
 

 </body>
</html>";
class BaseDatos{

    private $sqli;
    

    public function __construct(){

    }

    public function insertarAccion($nombre,$contraseña){
        $this->sqli=new mysqli("localhost","DBUSER2022","DBPSWD2022","centralita");
        $queryTabla=$this->sqli->prepare("
        INSERT INTO Usuario VALUES(?,?,?)
        ");
        //Comprobar que no existe ya el nombre(opcional de momento)
        //Buscar con una query el ultimo numero de usuario y ponerlo +1
        $valorid= $this->buscarUltimoId()+1;
        $queryTabla->bind_param('sss',$valorid,$nombre,$contraseña);
        $queryTabla->execute();
        $queryPresupuesto=$this->sqli->prepare("
        INSERT INTO Presupuesto VALUES(?,?,?)
        ");
        $total=0;
        $queryPresupuesto->bind_param('sss',$valorid,$valorid,$total);
        $queryPresupuesto->execute();
        // crear un presupuesto para ese id con total 0

    }

    public function buscarUltimoId(){
        $query=$this->sqli->query("SELECT id_usuario from Usuario WHERE id_usuario=(SELECT MAX(id_usuario) FROM Usuario)");
        if($query->num_rows>0){
            $row=$query->fetch_assoc();
            return $row['id_usuario'];
        }else{
            return 0;
        }
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
        if(isset($_POST['dir2ser'])){
            $_SESSION['base']->directorMasDos();
        }
        if(isset($_POST['crear'])){
            $_SESSION['base']->insertarAccion($_POST['nombre'],$_POST['con']);
        }

        
    }
   

    
?>