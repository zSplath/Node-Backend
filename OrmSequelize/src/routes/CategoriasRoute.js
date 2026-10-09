const { Router } = require('express');
const CategoriaController = require('../controller/CategoriaController.js');

const controller = new CategoriaController();
const router = Router();

router.get('/categorias', (req, res) => controller.getAll(req, res));
router.get('/categorias/:id', (req, res) => controller.searchByID(req, res));
router.post('/categorias', (req, res) => controller.create(req, res));
router.put('/categorias/:id', (req, res) => controller.updateByID(req, res));
router.delete('/categorias/:id', (req, res) => controller.deleteByID(req, res));

module.exports = router;