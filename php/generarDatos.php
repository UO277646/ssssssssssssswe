<?php
session_start();
echo"<!DOCTYPE HTML>
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
 <h1>Crear todo</h1>
 <form action='#' method='post'>
 <input type='submit' name='crear' value='Crear Base con datos'>
 
 </form>
 

 </body>
</html>";
class BaseDatos{

    private $sqli;
    

    public function __construct(){

    }

    public function crearBase(){
        $this->sqli=new mysqli("localhost","DBUSER2022","DBPSWD2022","test");
        $this->sqli->query('CREATE DATABASE IF NOT EXISTS centralita');

    }

    public function crearTodo(){
        $this->crearBase();
        $this->crearTablas();
        $this->meterDatos("recursos.csv","detalles.csv");
    }


    public function meterDatos($recurso,$detalles){
        $this->cargarRecurso($recurso);
        $this->cargarDetalles($detalles);

        
    }
    public function crearRecurso(){
        $this->sqli=new mysqli("localhost","DBUSER2022","DBPSWD2022","centralita");
        $queryTabla="CREATE TABLE IF NOT EXISTS Recurso(
            id_recurso int not null,
            nombre varchar(255),
            tipo varchar(255),
            descripcion varchar(255),
            precio int,
           
            primary key(id_recurso) 
        )";

        $this->sqli->query($queryTabla);

    }
    public function cargarRecurso($recurso){
        $ficheroContent=file_get_contents($recurso);
        $filas=explode("\n",$ficheroContent);

        foreach($filas as $row){
            $tablecontent=explode(",",$row);
            
            $this->sqli=new mysqli("localhost","DBUSER2022","DBPSWD2022","centralita");
            $query=$this->sqli->prepare("INSERT INTO Recurso VALUES(?,?,?,?,?)");
            $query->bind_param('sssss',$tablecontent[0],$tablecontent[1],$tablecontent[2],$tablecontent[3],$tablecontent[4]);
            $query->execute();
                        
        }
    }
    public function crearDetallesRecurso(){
        $this->sqli=new mysqli("localhost","DBUSER2022","DBPSWD2022","centralita");
        $queryTabla="CREATE TABLE IF NOT EXISTS DetallesRecurso(
           
            id_detalle int not null,
            id_recurso int not null,
            ubicacion varchar(255),
            limitacion int,
    
            primary key(id_detalle),
            foreign key(id_recurso) references Recurso(id_recurso)
        )";

        $this->sqli->query($queryTabla);

    }
    public function cargarDetalles($actor){
        $ficheroContent=file_get_contents($actor);
        $filas=explode("\n",$ficheroContent);

        foreach($filas as $row){
            $tablecontent=explode(",",$row);
           
                $this->sqli=new mysqli("localhost","DBUSER2022","DBPSWD2022","centralita");
                $query=$this->sqli->prepare("INSERT INTO DetallesRecurso VALUES(?,?,?,?)");
            $query->bind_param('ssss',$tablecontent[0],$tablecontent[1],$tablecontent[2],$tablecontent[3]);
                $query->execute();
            
        }
    }


    public function crearTablas(){
        $this->crearUsuario();
        $this->crearPresupuesto();
        $this->crearRecurso();
        $this->crearReserva();
        $this->crearDetallesRecurso();
        
    }



    public function crearUsuario(){
        $this->sqli=new mysqli("localhost","DBUSER2022","DBPSWD2022","centralita");
        $queryTabla="CREATE TABLE IF NOT EXISTS Usuario(
            id_usuario int not null,
            nombre varchar(255),
            contraseña varchar(255),
            primary key(id_usuario)
        )";

        $this->sqli->query($queryTabla);

    }
    public function crearReserva(){
        $this->sqli=new mysqli("localhost","DBUSER2022","DBPSWD2022","centralita");
        $queryTabla="CREATE TABLE IF NOT EXISTS Reserva(
           
            id_reserva int not null,
            id_recurso int not null,
            id_usuario int not null,
            dia int(2),
            hora int(2),
            minutos int(2),
            CHECK(dia>0),
            CHECK(dia<31),
            CHECK(hora<25),
            CHECK(minutos<60),
            foreign key(id_usuario) references Usuario(id_usuario),
            foreign key(id_recurso) references Recurso(id_recurso),
            primary key(id_reserva)
        )";

        $this->sqli->query($queryTabla);

    }
    public function crearPresupuesto(){
        $this->sqli=new mysqli("localhost","DBUSER2022","DBPSWD2022","centralita");
        $queryTabla="CREATE TABLE IF NOT EXISTS Presupuesto(
            id_presupuesto int not null,
            id_usuario int not null,
            total int,
            
            primary key(id_presupuesto),
            foreign key(id_usuario) references Usuario(id_usuario)
        )";

        $this->sqli->query($queryTabla);

    }

    

}
$base=new BaseDatos();
$__SESSION['base']=$base ;
    if(isset($__SESSION['base'])){
        $base=new BaseDatos();
        $__SESSION['base']=$base ;
        
    }else{
        $base=$_SESSION['base'];
    }
    

    if(count($_POST)>0){
        if(isset($_POST['crear'])){
            $base->crearTodo();
        }
        
    }
   

    
?>