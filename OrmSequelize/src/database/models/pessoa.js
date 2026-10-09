'use strict';
const isValidCPF = require('../../utils/CpfValidatorHelper.js');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Cursos, {
        foreignKey: 'docente_id'
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        scope: { status: 'matriculado' },
        as: 'MatriculasAtivas'
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        as: 'Matriculas'
      });
    }
  }
  Pessoa.init({
    nome: {
      type: DataTypes.STRING, 
      validate: {
        len: {
          args: [3,30],
          msg: 'nome deve ter entre 3 e 30 caracteres'
        }
      }},
    email: {
      type: DataTypes.STRING, 
      validate: {
        isEmail: {
          args: true,
          msg: 'email inválido'
        }
      }},
    cpf: {
      type: DataTypes.STRING, 
      validate: {
        validCPF: isValidCPF
      }},
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid: true,
    defaultScope: {
      where: {
        ativo: true
      }
    },
    scopes: {
      allPersons: {
        where: {}
      }
    }
  });
  return Pessoa;
};