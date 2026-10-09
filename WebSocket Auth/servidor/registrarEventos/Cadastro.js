import { buscarUsuarioPorNome, cadastrarUsuario } from "../db/usuariosdb.js";

function registrarEventosCadastro(socket, io) {
    socket.on("cadastrar_usuario", async (data) => {
        const usuario = await buscarUsuarioPorNome(data.nome);

        if (usuario === null) {
            const resultado = await cadastrarUsuario(data);
    
            if (resultado.acknowledged) {
                socket.emit("cadastro_sucesso");
            } else {
                socket.emit("cadastro_erro");
            }
        } else {
            socket.emit("cadastro_existente");
        }

    })
}

export default registrarEventosCadastro