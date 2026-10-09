const express = require('express');
const pessoas = require('./PessoaRoute.js');
const categorias = require('./CategoriasRoute.js');
const cursos = require('./CursosRoute.js');

module.exports = app => {
  app.use(
    express.json(),
    pessoas,
    categorias,
    cursos
  );
};