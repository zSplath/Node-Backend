const Services = require('./Service.js');
const modelIndex = require('../database/models');

class PessoaService extends Services {
  constructor() {
    super('Pessoa');
    this.matriculaService = new Services('Matricula');
  }
  async getScopeAllPersons() {
    return await super.getByScope('allPersons');
  }

  async getActivesEnrollmentByStudant(id) {
    const studant = await super.getByID(id);
    return await studant.getMatriculasAtivas();
  }

  async getAllEnrollmentByStudant(id) {
    const studant = await super.getByID(id);
    return await studant.getMatriculas();
  }

  async cancel(id) {
    return modelIndex.sequelize.transaction(async (transaction) => {
      await this.matriculaService.updateRegistry({status: 'cancelado'}, {estudante_id: id}, transaction);
      await super.updateRegistry({ ativo: false}, {id: id}, transaction);
    });
  }
}

module.exports = PessoaService;