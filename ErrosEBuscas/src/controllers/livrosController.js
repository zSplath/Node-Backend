import NotFound from "../errors/notFound.js";
import {autores, livros} from "../models/index.js";
class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      req.result = livros.find().populate("autor")
      next()
    } catch (erro) {
      console.log(erro)
      next(erro)
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next(new NotFound("Id do Livro não localizado."))
      }
    } catch (erro) {
      next(erro)
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro)
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findByIdAndUpdate(id, {$set: req.body});

      if (livroResultados !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NotFound("Id do Livro não localizado."))
      }
      
    } catch (erro) {
      next(erro)
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findByIdAndDelete(id);

      if (livroResultados !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NotFound("Id do Livro não localizado."))
      }
    } catch (erro) {
      next(erro)
    }
  }

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await montaBusca(req.query)
      req.result = livros.find(busca).populate("autor");
      next()
    } catch (erro) {
      console.log(erro)
      next(erro)
    }
  }
}

async function montaBusca(param) {
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor } = param;

  const busca = {}

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i"};

  if (minPaginas || maxPaginas) busca.numeroPaginas = {}
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor})

    if (autor) busca.autor = autor._id
    else busca.autor = null
  }
  console.log(busca)
  return busca
}

export default LivroController