import mongoose from "mongoose";
import BaseError from "../errors/baseError.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import ErroValidacao from "../errors/ErroValidacao.js";

// eslint-disable-next-line no-unused-vars
function tratamentoDeErros (erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta(erro).enviarResposta(res)
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res)
  } else if (erro instanceof BaseError) {
    erro.enviarResposta(res)
  } else {
    new BaseError(erro).enviarResposta(res)
  }
}

export default tratamentoDeErros