'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cursos extends Model {
    static associate(models) {
      Cursos.belongsTo(models.Categoria, {
        foreignKey: 'categoria_id'
      });
      Cursos.belongsTo(models.Pessoa, {
        foreignKey: 'docente_id'
      });
      Cursos.hasMany(models.Matricula, {
        foreignKey: 'curso_id'
      });
    }
  }
  Cursos.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    data_inicio: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Cursos',
    tableName: 'cursos',
    paranoid: true
  });
  return Cursos;
};