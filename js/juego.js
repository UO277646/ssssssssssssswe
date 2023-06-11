class Juego{

    constructor(){

    }

    calcularRespuestasCorrectas(){
        var form = $("form")[0];
        var respuestasCorrectas=0;
        var respuestasMarcadas=0;
        for(var i=0;i<form.elements.length;i++){
            var el=form.elements[i];
            if(el.type==="radio" && el.checked ){
                respuestasMarcadas++;
            }
        }
        console.log(respuestasMarcadas);
        if(respuestasMarcadas==10){
            for(var i2=0;i2<form.elements.length;i2++){
                var el2=form.elements[i2];
                if(el2.type==="radio" && el2.checked && el2.value==="cor"){
                    respuestasCorrectas++;
                }
            }
            console.log(respuestasCorrectas);
            $('form').after("<p>Numero de respuestas correctas : "+respuestasCorrectas+"</p>");
        }else{
            $('form').after("<p>Por favor rellene todas las preguntas</p>");
        }




    }

}

var juego =new Juego();