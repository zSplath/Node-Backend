import jwt from "jsonwebtoken"

function autorizarUsuario (socket, next) {
    const token = socket.handshake.auth.token;

    try {
        const payloadJTW = jwt.verify(token, process.env.JWT_KEY)

        socket.emit("nome_logado", payloadJTW);
        
        next()
    } catch (e) {
        next(e)
    }
}

export default autorizarUsuario