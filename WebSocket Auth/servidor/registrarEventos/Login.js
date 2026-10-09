import { buscarUsuarioPorNome } from "../db/usuariosdb.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarToken.js";

function registrarEventosLogin(socket, io) {
    socket.on("login_usuario", async ({nome, senha}) => {
        const usuario = await buscarUsuarioPorNome(nome);

        if (usuario === null) {
            socket.emit('login_erro')
            return
        }

        const logado = autenticarUsuario(usuario, senha)

        if (logado) {
            const token = gerarJwt({usuario: nome})
            
            socket.emit('logado', token)
        } else {
            socket.emit('login_erro')
        }

    })
}

export default registrarEventosLogin