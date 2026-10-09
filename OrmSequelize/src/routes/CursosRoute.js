const { Router } = require('express');
const CursosController = require('../controller/CursosController.js');
const MatriculaController = require('../controller/MatriculaController.js');

const controller = new CursosController();
const matriculaControler = new MatriculaController();
const router = Router();

router.get('/cursos', (req, res) => controller.getCursosByDateInterval(req, res));
router.get('/cursos/lotados', (req, res) => matriculaControler.searchFullCursos(req, res));
router.get('/cursos/:id', (req, res) => controller.searchByID(req, res));
router.post('/cursos', (req, res) => controller.create(req, res));
router.put('/cursos/:id', (req, res) => controller.updateByID(req, res));
router.delete('/cursos/:id', (req, res) => controller.deleteByID(req, res));

module.exports = router;