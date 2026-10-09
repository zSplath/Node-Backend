import ErroValidacao from "../errors/ErroValidacao.js";
import NotFound from "../errors/notFound.js";

async function paginacao (req, res, next) {
  try {
    const { limite = 5, pag = 1, campoOrdenado = "_id", ordem = 1} = req.query;

    if (limite <= 0 || pag <= 0)
      return next(new ErroValidacao)

    const busca = req.result

    const livroResultados = await busca.find()
      .sort({ [campoOrdenado]: ordem})
      .skip((pag-1)*limite)
      .limit(limite)
      .exec();

    if (livroResultados.length !== 0) {
      res.status(200).json(livroResultados);
    } else {
      next(new NotFound("Nenhum Livro localizado."))
    }
  } catch (e) {
    next(e)
  }
}

export default paginacao