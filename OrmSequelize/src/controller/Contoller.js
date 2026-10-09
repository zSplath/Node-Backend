const parseID = require('../utils/ParseIdToNumberHerper.js');

class Controller {
  constructor(service) {
    this.service = service;
  }

  async getAll(req, res) {
    try {
      const all = await this.service.getAll();
      return res.status(200).json(all);
    } catch (e) {
      return res.status(500).json({erro: e.message});
    }
  }

  async searchByID(req, res) {
    try {
      const registry = await this.service.getByID(Number(req.params.id));
      return res.status(200).json(registry);
    } catch (e) {
      return res.status(500).json({erro: e.message});
    }
  }

  async searchOneByParams(req, res) {
    try {
      const registry = await this.service.getOneByWhere(parseID(req.params));
      return res.status(200).json(registry);
    } catch (e) {
      return res.status(500).json({erro: e.message});
    }
  }

  async create(req, res) {
    try {
      const created = await this.service.insertRegistry(req.body);
      return res.status(200).json(created);
    } catch (e) {
      return res.status(500).json({erro: e.message});
    }
  }

  async updateByID(req, res) {
    const { id } = req.params;
    const dados = req.body;
    try {
      const wasUpdated = await this.service.updateRegistry(dados, parseID(req.params));
      if (!wasUpdated) {
        return res.status(400).json({ mensagem: `${id} Não atualizado` });
      }
      return res.status(200).json({ mensagem: `${id} atualizado` });
    } catch (e) {
      return res.status(500).json({erro: e.message});
    }
  }

  async deleteByID(req, res) {
    const { id } = req.params;
    try {
      await this.service.deleteRegistry(Number(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (e) {
      return res.status(500).json({erro: e.message});
    }
  }
}

module.exports = Controller;