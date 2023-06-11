function generarArchivo(nombreArchivo, contenido) {
    var enlaceDescarga = document.createElement("a");
    enlaceDescarga.setAttribute("href", "data:image/svg+xml;charset=utf-8," + encodeURIComponent(contenido));
    enlaceDescarga.setAttribute("download", nombreArchivo);

    enlaceDescarga.style.display = "none";
    document.body.appendChild(enlaceDescarga);

    enlaceDescarga.click();

    document.body.removeChild(enlaceDescarga);
}

class Parser{

    constructor(){

    }


    calcularRespuestasCorrectas(file){
        var file1 = file[0];
        if (file1.type.match(/text.xml/)) {
            var reader = new FileReader();
            reader.onload = function (evento) {

                var xmlString = evento.target.result;
                var xmlDoc=$.parseXML(xmlString);
                var svgn="http://www.w3.org/2000/svg";
                var svg = document.createElementNS(svgn, "svg");
                var svgWidth = 400; // Ancho del SVG
                var svgHeight = 400; // Alto del SVG
                svg.setAttribute("width",svgWidth);
                svg.setAttribute("height",svgHeight);
                
                
                
                // Calcular la escala en el eje Y
                var maxAltitude = 640;
                
                var escala=200/maxAltitude;
                var x=50
                // Crear el elemento SVG
      
                var rutas = $(xmlDoc).find("ruta");
                var i=0;
                var puntos=[];
                rutas.each(function () {
                    var ruta = $(this);
                    var altitud =ruta.find("datos coordenadasRuta altitud").text();
                    var altitudsincomillas=altitud.substring(1,altitud.length-1);
                    var altitudvalor=parseInt(altitudsincomillas);
                    var nombre="Ruta "+i;
                    var rutapunto={nombre:nombre,altura:altitudvalor}
                    puntos.push(rutapunto);
                    i++;
                });
                var polylinePoints = puntos.map(function (punto, index) {
                    var altura = punto.altura * escala;
                    return (x + (index * 100)) + "," + (250 - altura);
                  }).join(" ");
                
                  var polyline = document.createElementNS(svgn, "polyline");
                  polyline.setAttribute("points", polylinePoints);
                  polyline.setAttribute("fill", "none");
                  polyline.setAttribute("stroke", "#2196F3");
                  polyline.setAttribute("stroke-width", "2");
                  svg.appendChild(polyline);
                  
                  puntos.forEach(function (punto, index) {
                    var altura = punto.altura * escala;
                    var circle = document.createElementNS(svgn, "circle");
                    circle.setAttribute("cx", x + (index * 100));
                    circle.setAttribute("cy", 250 - altura);
                    circle.setAttribute("r", "4");
                    circle.setAttribute("fill", "#2196F3");
                    svg.appendChild(circle);
                    
                    var text = document.createElementNS(svgn, "text");
                    text.setAttribute("x", x + (index * 100));
                    text.setAttribute("y", 270);
                    text.setAttribute("text-anchor", "middle");
                    text.textContent = punto.nombre;
                    svg.appendChild(text);
                  });
                var contenidoSVG = new XMLSerializer().serializeToString(svg);
                
                //console.log(kmlString);
                generarArchivo("rutas.svg", contenidoSVG);

            }
            reader.readAsText(file1);
        } else {
            // Lógica para otros tipos de archivos si es necesario
        }



    }

}

var proc =new Parser();