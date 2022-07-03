'use strict'

// import mongoose
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

// coneccion DB
mongoose.Promise = global.Promise;

// localhost no funciona en Nodejs 17+ y fue necesario sustituir por 0.0.0.0
// mongoose.connect('mongodb://localhost:27017/portafolio')
mongoose.connect('mongodb://0.0.0.0:27017/portafolio')
    .then(()=>{
        console.log("Conexion a DB exitosa");
        
// creacion del server
        app.listen(port, () =>{
            console.log("servidor corriendo correctamente");
        });

    })
    .catch(err => console.log(err));