import jwt from "jsonwebtoken"

function gerarJwt(payload) {
    return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: "1h"})
}

export default gerarJwt