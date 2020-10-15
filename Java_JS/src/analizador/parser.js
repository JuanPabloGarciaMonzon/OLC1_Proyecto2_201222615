var fs = require('fs');
var parser = require('./analizadorJS');

function ejecutar(texto)
{
    try
    {
        let traduccion = parser.parse(texto);
        console.log(traduccion);
        fs.writeFile('salida.txt', traduccion, function(err){
            if(err) throw err;
            console.log('Guardado! :D');
        });
    }catch(err)
    {
        console.log(err);
    }
}

fs.readFile('entrada.txt', 'utf8', function(err, data) {
    console.log(data);
    ejecutar(data);
    console.log('Analisis terminado.')
})