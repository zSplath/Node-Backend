const db = require('../database/models');
const Sequelize = require('sequelize');

class Services {
  constructor(modelName) {
    this.model = modelName;
  }

  async getAll(where={}) {
    return db[this.model].findAll({where: {...where}});
  }

  async getByScope(scope) {
    return db[this.model].scope(scope).findAll();
  }

  async getByID(id) {
    return db[this.model].findByPk(id);
  }

  async getTotalByWhere(where) {
    return db[this.model].findAndCountAll({where: {...where}});
  }

  async getTotalByLimit(where = {}, group, max) {
    return db[this.model].findAndCountAll({
      where: { ...where },
      attributes: [group],
      group: [group],
      having: Sequelize.literal(`count(${group}) >= ${max}`)
    });
  }

  async getTotalByOptions(options) {
    return db[this.model].findAndCountAll({...options});
  }

  async getOneByWhere(where) {
    return db[this.model].findOne({ where: {...where}});
  }

  async insertRegistry(registry) {
    return db[this.model].create(registry);
  }
  
  async updateRegistry(toUpdate, where, transaction = {}) {
    const updatedList = await db[this.model]
      .update(toUpdate, { 
        where: { ...where },
        transaction: transaction 
      });
    return !(updatedList[0] === 0);
  }

  async deleteRegistry(id) {
    return db[this.model].destroy({ where: { id: id } });
  }
}

module.exports = Services;