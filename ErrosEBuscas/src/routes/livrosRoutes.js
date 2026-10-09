import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginacao from "../middlewares/paginacao.js";

const router = express.Router();

router
  .get("/livros", LivroController.listarLivros, paginacao)
  .get("/livros/busca", LivroController.listarLivroPorFiltro, paginacao)
  .get("/livros/:id", LivroController.listarLivroPorId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro)

export default router;   