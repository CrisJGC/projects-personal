'use strict'
// llamar al modulo express y body-parser
var express = require('express');
var bodyParser = require('body-parser');
// 
var app = express();

// cargar archivos ruta
var project_routes = require('./routes/project');


// middlewares, capa ejecutado antes de un controlador/resultado
// body-parser convertir dato por post a json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// cors
// Configurar cabeceras y cors
// Se ejecuta antes de cada peticion y es necesario antes de las rutas
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas
app.use('/api', project_routes);
// app.get('/', (req, res) =>{
//     res.status(200).send(
//         '<h1>Hola desde API nodeJS</h1>' 
//     )
// });

// app.get('/test', (req, res) =>{
//     res.status(200).send({
//         mensaje: 'Hola desde API nodeJS' 
//     })
// });

// exportar
module.exports = app;