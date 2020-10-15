const express = require('express');
const app = express();
//funcion que procesa datos antes de que el servidor lo reciba
const morgan = require('morgan');

//configuraciones
//app.set('port', process.env.PORT || 3000);
app.set('port',process.env.PORT || 3000);
app.set('json spaces',2);

// middleware intermedio
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//rutas
/*app.get('/',(req,res)=>{
    //res.send('Hola Mundo');
    res.json({"Title":"Hola Mundo"});
});
*/
app.use(require('./rutas/index'));
app.use('/api/movies',require('./rutas/movies'));
app.use('/api/entrada',require('./rutas/entrada'));





//iniciando servidor
app.listen(app.get('port'),()=>{
    console.log(`servidor en el puerto ${app.get('port')}`);
});