import express from "express";
import AutorController from "../controllers/autoresController.js";
import paginacao from "../middlewares/paginacao.js";

const router = express.Router();

router
  .get("/autores", AutorController.listarAutores, paginacao)
  .get("/autores/:id", AutorController.listarAutorPorId)
  .post("/autores", AutorController.cadastrarAutor)
  .put("/autores/:id", AutorController.atualizarAutor)
  .delete("/autores/:id", AutorController.excluirAutor)

export default router;   