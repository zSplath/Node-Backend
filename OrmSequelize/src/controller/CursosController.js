const Controller = require('./Contoller.js');
const CursosService = require('../services/CursosService.js');

const { Op } = require('sequelize');

class CursosController extends Controller {
  constructor() {
    super(new CursosService());
  }

  async getCursosByDateInterval(req,res) {
    const { data_inicial, data_final } = req.query;
    const where = {};
    if (data_inicial || data_final) where.data_inicio = {};
    if (data_inicial) where.data_inicio[Op.gte] = data_inicial;
    if (data_final) where.data_inicio[Op.lte] = data_final;

    try {
      const cursos = await this.service.getAll(where);
      return res.status(200).json(cursos);
    } catch (e) {
      return res.status(500).json({erro: e.message});
    }

  }
}

module.exports = CursosController;