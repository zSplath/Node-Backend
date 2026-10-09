import NotFound from "../errors/notFound.js"

function noRoute (req, res, next) {
  const erro = new NotFound()
  next(erro)
}

export default noRoute