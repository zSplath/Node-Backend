const Controller = require('./Contoller.js');
const CategoriaService = require('../services/CategoriaService.js');

class CategoriaController extends Controller {
  constructor() {
    super(new CategoriaService());
  }
}

module.exports = CategoriaController;