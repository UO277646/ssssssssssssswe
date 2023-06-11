function generarArchivo(nombreArchivo, contenido) {
    var enlaceDescarga = document.createElement("a");
    enlaceDescarga.setAttribute("href", "data:text/html;charset=utf-8," + encodeURIComponent(contenido));
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
                var htmlDoc = document.implementation.createHTMLDocument();
                htmlDoc.documentElement.setAttribute("lang", "es");
                var head=$(htmlDoc).find("head");
                head.append( "    <meta charset=\"UTF-8\" />\r\n"
                    + "    <title>Amistades </title>\r\n"
                    + "    <link rel=\"stylesheet\" type=\"text/css\" href=\"../estilo/estilo.css\"/>\r\n"
                    + "    <meta name=\"author\" content=\"Juan Dominguez\" />\r\n"
                    + "    <meta name=\"keywords\" content=\"persona ,comentario , nombre , apellidos\" />\r\n"
                    + "    <meta name =\"viewport\" content =\"width=device-width, initial scale=1.0\" />\r\n"
                    + "    <meta name=\"description\" content=\"Pagina principal que contiene el arbol de amistades de Juan Dominguez Alvarez\" />\r\n"
                    );
                var body=$(htmlDoc).find("body");
                var rutas = $(xmlDoc).find("ruta");
                var h1 = $("<h1></h1>");
                h1.text("Rutas de muros del nalon");
                body.append(h1);
                var nav=$("<nav></nav>");
                nav.html("  <p>\n" +
                    "        <a title= \"Pagina principal\" tabindex=\"1\" accesskey=\"T\" href=\"index.html\">Pagina principal</a>\n" +
                    "    </p>\n" +
                    "    <p>\n" +
                    "        <a title= \"Gastronomia\" tabindex=\"2\" accesskey=\"C\" href=\"gastronomia.html.html\">Gastronomia</a>\n" +
                    "    </p>\n" +
                    "    <p>\n" +
                    "        <a title= \"Meteorologia\" tabindex=\"3\" accesskey=\"D\" href=\"meteorologia.html\">Meteorologia</a>\n" +
                    "    </p>\n" +
                    "    <p>\n" +
                    "        <a title= \"Juego\" tabindex=\"4\" accesskey=\"P\" href=\"juego.html\">Juego</a>\n" +
                    "    </p>\n" +
                    "    <p>\n" +
                    "        <a title= \"Reserva\" tabindex=\"5\" accesskey=\"G\" href=\"reserva.html\">Reserva</a>\n" +
                    "    </p>\n" +
                    "    <p>\n" +
                    "        <a title= \"Rutas\" tabindex=\"6\" accesskey=\"Y\" href=\"rutas.html\">Rutas</a>\n" +
                    "    </p>\n");
                body.append(nav);
                rutas.each(function () {
                    var ruta = $(this);



                    var section = $("<section></section>");
                    var hd=$("<h2></h2>");
                    hd.text(ruta.attr('nombre'));
                    var p=$("<p></p>");
                    p.text("Medio de transporte recomendado : "+ruta.find("datos medioTransporte").text()+"; Duracion estimada : "+ruta.find("datos duracion").text()+"; Hecha para : "+ruta.find("datos personas").text());
                    // Establece el contenido del <div> al valor del elemento XML
                    section.append(hd);
                    section.append(p);

                    body.append(section);
                });
                var htmlString="<!DOCTYPE HTML>\r\n"
                    +htmlDoc.documentElement.outerHTML;
                generarArchivo("rutas.html", htmlString);

            }
            reader.readAsText(file1);
        } else {
            // Lógica para otros tipos de archivos si es necesario
        }



    }

}

var proc =new Parser();