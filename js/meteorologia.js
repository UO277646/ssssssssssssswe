class Tiempo{
    constructor(){
        this.apikey="d13b8b5c723e80eef3b18dc92d594344";
        this.ciudad="Muros";
        this.codigoPais="ES";
        this.unidades="&units=metric";
        this.idioma="&lang=es";
        this.url="https://api.openweathermap.org/data/2.5/weather?q="+this.ciudad+","+this.codigoPais+this.unidades+this.idioma+"&APPID="+this.apikey;
    }

    load(){
        $.ajax({
            dataType:"json",
            url:this.url,
            method:'GET',
            success:function(data){
                var cadena="<h2>Tiempo en los proximos siete dias en Muros del Nalon</h2>";
                cadena+="<ul><li>Dia: "+data.list[1].dt_txt+" temperatura : "+data.list[1].main.temp+" tiempo :"+data.list[1].weather[0].main+"</li>";
                cadena+="<li>Dia: "+data.list[0].dt_txt+" temperatura : "+data.list[0].main.temp+" tiempo :"+data.list[0].weather[0].main+"</li>";
                cadena+="<li>Dia: "+data.list[2].dt_txt+" temperatura : "+data.list[2].main.temp+" tiempo :"+data.list[2].weather[0].main+"</li>";
                cadena+="<li>Dia: "+data.list[10].dt_txt+" temperatura : "+data.list[10].main.temp+" tiempo :"+data.list[10].weather[0].main+"</li>";
                cadena+="<li>Dia: "+data.list[18].dt_txt+" temperatura : "+data.list[18].main.temp+" tiempo :"+data.list[18].weather[0].main+"</li>";
                cadena+="<li>Dia: "+data.list[26].dt_txt+" temperatura : "+data.list[26].main.temp+" tiempo :"+data.list[26].weather[0].main+"</li>";
                cadena+="<li>Dia: "+data.list[34].dt_txt+" temperatura : "+data.list[34].main.temp+" tiempo :"+data.list[34].weather[0].main+"</li>";
                cadena+="<li>Dia: "+data.list[39].dt_txt+" temperatura : "+data.list[39].main.temp+" tiempo :"+data.list[39].weather[0].main+"</li></ul>";
                $("main").html(cadena);

            },
            error:function(){
                $("h3").html("Ha ocurrido un problema inesperado");
                $("p").remove();
            }
        });


    }
    mostrar(){
        this.ciudad="muros";
        this.url="https://api.openweathermap.org/data/2.5/forecast?q="+this.ciudad+","+this.codigoPais+this.unidades+this.idioma+"&APPID="+this.apikey;
        $("main").remove();
        $("section").after(document.createElement("main"));
       // $("h2").remove();


        this.load();

    }

}

var tiempo =new Tiempo();
