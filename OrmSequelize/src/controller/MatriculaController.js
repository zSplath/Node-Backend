const Controller = require('./Contoller.js');
const MatriculaService = require('../services/MatriculaService.js');

class MatriculaController extends Controller {
  constructor() {
    super(new MatriculaService());
  }
  
  async searchTotalActivesByStudant(req, res) {
    try {
      const matriculas = await this.service.getTotalByWhere({
        estudante_id: Number(req.params.id), 
        status: 'matriculado'
      });
      return res.status(200).json({total: matriculas.count});
    } catch (e) {
      return res.status(500).json({erro: e.message});
    }
  }

  async searchFullCursos(req, res) {
    const max = 2;
    try {
      const fullCursos = await this.service.getTotalByLimit({ status: 'matriculado' }, 'curso_id', max);
      return res.status(200).json(fullCursos.rows);
    } catch (e) {
      return res.status(500).json({erro: e.message});
    }
  }
}

module.exports = MatriculaController;