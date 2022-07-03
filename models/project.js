'use strict'

const { ServerDescription } = require('mongodb');
// importar mongoose para models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// molde base
var ProjectSchema = Schema({
    name: String,
    description: String,
    catego: String,
    tech: String,
    year: Number,
    image: String
}); 

// exportar y usarlo de modelo
module.exports = mongoose.model('Project', ProjectSchema);
// si ya existe projects => guarda los documentos en la coleccion