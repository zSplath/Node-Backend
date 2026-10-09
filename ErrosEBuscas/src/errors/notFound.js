import BaseError from "./baseError.js";

class NotFound extends BaseError {
  constructor (error = "Rota não existe", msg = "Não encontrado") {
    super(error, msg, 404);
  }
}

export default NotFound