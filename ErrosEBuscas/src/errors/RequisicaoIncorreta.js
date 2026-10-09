import BaseError from "./baseError.js";

class RequisicaoIncorreta extends BaseError {
  constructor (erro, msg="Um ou mais dados enviados estão incorretos.") {
    super(erro, msg, 400);
  }
}

export default RequisicaoIncorreta