import NotFound from "../errors/notFound.js";
import {autores} from "../models/index.js";

class AutorController {

  static listarAutores = async(req, res, next) => {
    try {
      req.result = autores.find();
      next()
    } catch (erro) {
      next(erro);
    }
  }

  // trecho de código suprimido

  static listarAutorPorId  = async (req, res, next) => {
    try {
      const id =  req.params.id;

      const autoresResultado = await autores.findById(id);

      if (autoresResultado !== null) {
        res.status(200).send(autoresResultado);
      } else {
        next(new NotFound("Id do Autor não localizado."))
      }

    } catch (erro) {
      next(erro)
    }
  };
  
  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
  
      const autorResultado = await autor.save();
  
      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro)
    }
  }
  

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const autor = await autores.findByIdAndUpdate(id, {$set: req.body});
      if (autor !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso", antes: autor});
      } else {
        next(new NotFound("Id do Autor não localizado."))
      }

    } catch (erro) {
      next(erro)
    }
  }
  
  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const autor = await autores.findByIdAndDelete(id);
      if (autor !== null) {
        res.status(200).send({message: "Autor removido com sucesso", antes: autor});
      } else {
        next(new NotFound("Id do Autor não localizado."))
      }
    } catch (erro) {
      next(erro)
    }
  }
  

}

export default AutorController