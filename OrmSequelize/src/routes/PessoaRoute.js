const { Router } = require('express');
const PessoaController = require('../controller/PessoaController.js');
const MatriculaController = require('../controller/MatriculaController.js');

const controller = new PessoaController();
const matriculaControler = new MatriculaController();
const router = Router();

router.get('/pessoas', (req, res) => controller.getAll(req, res));
router.get('/pessoas/todos', (req, res) => controller.getAllPersons(req, res));
router.get('/pessoas/:id', (req, res) => controller.searchByID(req, res));
router.post('/pessoas', (req, res) => controller.create(req, res));
router.put('/pessoas/:id', (req, res) => controller.updateByID(req, res));
router.delete('/pessoas/:id', (req, res) => controller.deleteByID(req, res));
router.put('/pessoas/:id/cancelar', (req, res) => controller.cancelPerson(req, res));
router.get('/pessoas/:id/matriculas', (req, res) => controller.getActivesEnrollment(req, res));
router.get('/pessoas/:id/matriculas/todos', (req, res) => controller.getAllEnrollment(req, res));
router.get('/pessoas/:id/matriculas/total', (req, res) => matriculaControler.searchTotalActivesByStudant(req, res));
router.get('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaControler.searchOneByParams(req, res));
router.post('/pessoas/:id/matriculas', (req, res) => matriculaControler.create(req, res));
router.put('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaControler.updateByID(req, res));
router.delete('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaControler.deleteByID(req, res));

module.exports = router;