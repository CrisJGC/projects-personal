'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller ={
    home: function(req, res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    test: function(req,res){
        return res.status(200).send({
            message: 'Soy el metodo o accion test del controllador de project'
        });
    },
    blog: (req, res) => {
        return res.status(200).send({
            message: 'Lista del blog'
        });
    },

    // guardar el proyecto
    saveProject: (req, res) =>{
        var project = new Project();
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.catego = params.catego;
        project.tech = params.tech;
        project.year = params.year;
        project.image = null;

        project.save((err, projectStored) =>{
            if(err) return res.status(500).send({message: 'Error al guardar el doc.'});
            if(!projectStored) return res.status(404),send({message: 'No se ha podido guardar el proyecto.'});
            
            return res.status(200).send({project: projectStored})
        });
    },

    // consulta de un proyecto
    getProject: (req,res) =>{
        var projectId = req.params.id;
        if(projectId == null) return res.status(404).send({message: 'El proyecto no existe.'});

        Project.findById(projectId, (err, project)=>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
            if(!project) return res.status(404).send({message: 'El proyecto no existe.'});

            return res.status(200).send({project})

        });
    },

    // Todos los proyectos  sort para ordenar
    getAllProjects: (req, res) =>{
        Project.find().sort('year').exec((err, allProyects)=>{
            if(err) return res.status(200).send({message: 'Error al devolver datos'});
            if(!allProyects) return res.status(404).send({message: 'No hay proyectos guardados'});

            return res.status(200).send({allProyects});
        
        });
    },

    // actualizar datos
    updateProject: (req, res) =>{
        var projectId = req.params.id;
        var update = req.body;

            // para devolver la nueva info tercer param {new:true}    
        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdate)=>{
            if(err) return res.status(500).send({message: 'Error al actualizar'});
            if(!projectUpdate) return res.status(404).send({message: 'No existe el proyecto'});

            return res.status(200).send({project: projectUpdate})

        });
    },

    // borrar proyectos
    deleteProject: (req, res) =>{
        var projectId = req.params.id;

        Project.findByIdAndDelete(projectId, (err, projectDel)=>{
            if(err) return res.status(500).send({message: 'Error al borrar proyecto'});
            if(!projectDel) return res.status(404).send({message: 'No existe el proyecto'});

            return res.status(200).send({project: projectDel});
        });
    },

    // subir files
    upload: (req, res) =>{
        var projectId = req.params.id;

        if(req.files){
            //ruta donde se guardo el archivo 
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];

            Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true}, (err,projectUpdate) => {
                if(err) return res.status(500).send({message: 'El archivo no se ha subido'});
                if(!projectUpdate) return res.status(404).send({message: 'No se encuentra el proyecto'});
                
                return res.status(200).send({
                    project: projectUpdate
                });
            });
            
        }else{
            return res.status(200).send({
                message: 'Imagen no subida'
            });
        }

    },

    // obtener imagen
    getImageFile: function (req,res){
        var file = req.params.image;
        var pathFile = './uploads/'+file;

        // fs.stat(pathFile, (err, stats) => {
        //     if(stats){
        //         return res.sendFile(path.resolve(pathFile));
        //     }else{
        //         return res.status(200).send({message: "No existe la imágen..."});
        //     }
        // });

        fs.access(pathFile,fs.constants.F_OK,(err)=>{
            if(!err){
                return res.sendFile(path.resolve(pathFile));
            }else{
                return res.status(200).send({message: "No exisite la imagen"});
            }
        });

        // fs.exists(pathFile, (exists) =>{
        //     if(exists){
        //         return res.sendFile(path.resolve(pathFile))
        //     }else{
        //         return res.status(200).send({
        //             message: "No existe la imagen..."
        //         });
        //     }
        // });
    }
};

module.exports = controller;