const Controller = require('./Contoller.js');
const PessoaService = require('../services/PessoaService.js');

const pessoaService = new PessoaService();

class PessoaController extends Controller {
  constructor() {
    super(pessoaService);
  }

  async getAllPersons(req, res) {
    try {
      const persons = await pessoaService.getScopeAllPersons();
      return res.status(200).json(persons);
    } catch (e) {
      return res.status(500).json({erro: e.message});
    }
  }
  async getActivesEnrollment(req, res) {
    try {
      const enrollments = await pessoaService.getActivesEnrollmentByStudant(Number(req.params.id));
      return res.status(200).json(enrollments);
    } catch (e) {
      return res.status(500).json({erro: e.message});
    }
  }
  async getAllEnrollment(req, res) {
    try {
      const enrollments = await pessoaService.getAllEnrollmentByStudant(Number(req.params.id));
      return res.status(200).json(enrollments);
    } catch (e) {
      return res.status(500).json({erro: e.message});
    }
  }

  async cancelPerson(req, res) {
    try {
      const persons = await pessoaService.cancel(Number(req.params.id));
      return res.status(200).json(persons);
    } catch (e) {
      return res.status(500).json({erro: e.message});
    }
  }
}

module.exports = PessoaController;