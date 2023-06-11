class pPrincipal{

    constructor(){

    }
    ocultarp(){
        $('p').hide();
    }

    mostrarp(){
        $('p').show();
    }
    mostrarHoraFooter(){
        var fecha=new Date();
        var hora=fecha.getHours();
        var minutos=fecha.getMinutes();
        $("footer").find("p").html("La ultima actualizacion se ha realizado a las "+hora+":"+minutos);
    }
    cambiarImagen(){
        if($('img:first').attr('src')=="multimedia/muros.png"){
            $('img:first').attr('src',"multimedia/miradorAtalaya.jpg");
        }else if ($('img:first').attr('src')=="multimedia/miradorAtalaya.jpg"){
            $('img:first').attr('src',"multimedia/carpon.jpg");
        }else if ($('img').attr('src')=="multimedia/carpon.jpg"){
            $('img:first').attr('src',"multimedia/garruncho.jpg");
        }else if ($('img:first').attr('src')=="multimedia/garruncho.jpg"){
            $('img:first').attr('src',"multimedia/espinos.jpg");
        }
        else if ($('img:first').attr('src')=="multimedia/espinos.jpg"){
            $('img:first').attr('src',"multimedia/muros.png");
        }
        this.mostrarHoraFooter();

    }

    
}
class Tiempo{
    constructor(){
        this.apikey="d13b8b5c723e80eef3b18dc92d594344";
        this.ciudad="Muros";
        this.codigoPais="ES";
        this.unidades="&units=metric";
        this.idioma="&lang=es";
        this.url="http://api.openweathermap.org/data/2.5/weather?q="+this.ciudad+","+this.codigoPais+this.unidades+this.idioma+"&APPID="+this.apikey;
    }

    load(){
        $.ajax({
            dataType:"json",
            url:this.url,
            method:'GET',
            success:function(data){
                var cadena="<h2>Tiempo Actual</h2>";
                cadena+="<ul><li>Ciudad:"+data.name+"</li>";
                cadena+="<li>Pais:"+data.sys.country+"</li>";
                cadena+="<li>Latitud:"+data.coord.lat+"</li>";
                cadena+="<li>Longitud:"+data.coord.lon+"</li>";
                cadena+="<li>Temperatura:"+data.main.temp+"</li>";
                cadena+="<li>Temperatura minima:"+data.main.temp_min+"</li>";
                cadena+="<li>Temperatura maxima:"+data.main.temp_max+"</li>";
                cadena+="<li>Presion:"+data.main.pressure+"</li>";
                cadena+="<li>Humedad:"+data.main.humidity+"</li>";
                cadena+="<li>Amanece a las :"+new Date(data.sys.sunrise*1000).toLocaleTimeString()+"</li>";
                cadena+="<li>Oscurece a las:"+new Date(data.sys.sunset*1000).toLocaleTimeString()+"</li>";
                cadena+="<li>Direccion del viento:"+data.wind.deg+"</li>";
                cadena+="<li>Velocidad del viento:"+data.wind.speed+"</li>";
                cadena+="<li>Hora:"+new Date(data.dt*1000).toLocaleTimeString()+"</li>";
                cadena+="<li>Fecha:"+new Date(data.dt*1000).toLocaleDateString()+"</li>";
                cadena+="<li>Descripcion:"+data.weather[0].description+"</li>";
                cadena+="<li>Visibilidad:"+data.visibility+"</li>";
                cadena+="<li>Nubosidad:"+data.clouds.all+"</li></ul>";
                $("main").html(cadena);
                $("img:last").attr("src","http://openweathermap.org/img/wn/"+data.weather[0].icon+".png");
                $("img:last").attr("alt","no img");

            },
            error:function(){
                $("h3").html("Ha ocurrido un problema inesperado");
                $("p").remove();
            }
        });


    }
    mostrar(){
        this.ciudad="muros";
        this.url="http://api.openweathermap.org/data/2.5/weather?q="+this.ciudad+","+this.codigoPais+this.unidades+this.idioma+"&APPID="+this.apikey;
        $("main").remove();
        $("footer").before(document.createElement("main"));
        //$("h2").remove();
        $('img[alt="no img"]').remove();
        $("footer").before(document.createElement("img"));
        this.load();
        this.mostrarHoraFooter();
    }

    mostrarHoraFooter(){
        var fecha=new Date();
        var hora=fecha.getHours();
        var minutos=fecha.getMinutes();
        $("footer").find("p").html("La ultima actualizacion se ha realizado a las "+hora+":"+minutos);
    }
}

class Noticias{
    constructor(){
        this.apikey="80c3a698b2602b7ec4da12e5bd57254f";
        this.url="https://gnews.io/api/v4/search?q=asturias&lang=es&country=es&max=10&apikey="+this.apikey;
        //this.url="https://newsapi.org/v2/everything?q=asturias&from=2023-06-05&sortBy=publishedAt&apiKey="+this.apikey;
    }

    load(){
        $.ajax({
            dataType:"json",
            url:this.url,
            method:'GET',
            success:function(data){
                var cadena="<h2>Noticias</h2>";
                cadena+="<ul>"
                for(let i=0;i<4;i++){
                    cadena+="<li>"+data.articles[i].title+"</li>";
                }
                cadena+="</ul>"


                $("aside").html(cadena);


            },
            error:function(){
                $("h3").html("Ha ocurrido un problema inesperado");
                $("p").remove();
            }
        });


    }
    mostrar(){

        $("aside").remove();
        $("footer").before(document.createElement("aside"));
        this.load();
        this.mostrarHoraFooter();
    }

    mostrarHoraFooter(){
        var fecha=new Date();
        var hora=fecha.getHours();
        var minutos=fecha.getMinutes();
        $("footer").find("p").html("La ultima actualizacion se ha realizado a las "+hora+":"+minutos);
    }
}

var geoloc =new Object();
geoloc.mapa=mapaDinamico;
function mapaDinamico(){
    var avi={ lat:43.555,lng:-6.096};
    var mapa=new google.maps.Map(document.querySelector("section:last-of-type"),{zoom:15,center:avi});
    var marc=new google.maps.Marker({position:avi,map:mapa});

    $("section:last").prepend("<h2>Mapa Dinamico</h2>");
}

var tiempo =new Tiempo();
var pagina=new pPrincipal();
var noticias=new Noticias();