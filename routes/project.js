'use strict'
// JS
var express = require('express');
var ProjectController = require('../controllers/project');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});
// middleware necesita aplicar a una ruta como segunda opcion

var router = express.Router();
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/blog', ProjectController.blog);
router.post('/save',ProjectController.saveProject);
router.get('/project/:id?',ProjectController.getProject);
router.get('/projects',ProjectController.getAllProjects);
router.put('/project/:id',ProjectController.updateProject);
router.delete('/project/:id',ProjectController.deleteProject);
router.post('/upload/:id', multipartMiddleware, ProjectController.upload);
router.get('/get-image/:image', ProjectController.getImageFile);

module.exports = router;
