import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor (erro = { errors: { default: { message: "Bad Request" } } }, msg="Dados fora do formato obrigatório") {
    erro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join(" | ")
    super(erro, msg, 400);
  }
}

export default ErroValidacao