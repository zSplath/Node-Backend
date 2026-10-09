class BaseError extends Error {

  constructor(erro=null, msg = "Erro interno", status="500") {
    super();
    this.erro = erro
    this.message = msg
    this.status = status
  }

  enviarResposta(res) {
    res.status(this.status).send({
      status: this.status,
      message: this.message,
      error: this.erro
    })
  }
}

export default BaseError