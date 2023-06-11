function generarArchivo(nombreArchivo, contenido) {
    var enlaceDescarga = document.createElement("a");
    enlaceDescarga.setAttribute("href", "data:text/xml;charset=utf-8," + encodeURIComponent(contenido));
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
                var kmldocument = document.implementation.createDocument('', 'kml', null);
                var kmlElement = kmldocument.documentElement;
                var documentElement = kmldocument.createElement('Document');
                kmlElement.appendChild(documentElement);
                var rutas = $(xmlDoc).find("ruta");
                
                rutas.each(function () {
                    var ruta = $(this);
                    var latitud =ruta.find("datos coordenadasRuta latitud").text();
                    var longitud =ruta.find("datos coordenadasRuta longitud").text();
                    var placemarkElement = kmldocument.createElement('Placemark');

                    var pointElement = kmldocument.createElement('Point');
                    
                    var coordinatesElement = kmldocument.createElement('coordinates');
                    var coordinatesText = latitud.substring(1,latitud.length-1) + ' ' + longitud.substring(1,longitud.length-1); 
                    coordinatesElement.textContent = coordinatesText;
                    pointElement.appendChild(coordinatesElement);
                    placemarkElement.appendChild(pointElement);
                    documentElement.appendChild(placemarkElement);
                   
                    
                    
                });
                var serializer = new XMLSerializer();
                var kmlString = serializer.serializeToString(kmldocument);
                //console.log(kmlString);
                generarArchivo("rutas.kml", kmlString);

            }
            reader.readAsText(file1);
        } else {
            // Lógica para otros tipos de archivos si es necesario
        }



    }

}

var proc =new Parser();