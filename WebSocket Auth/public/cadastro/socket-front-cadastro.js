import {  } from "./cadastro.js";

const socket = io();

function emitirCadastroUsuario(data) {
  socket.emit("cadastrar_usuario", data);
}

socket.on("cadastro_sucesso", () => alert("Cadastrado"))
socket.on("cadastro_erro", () => alert("Erro no Cadastro"))
socket.on("cadastro_existente", () => alert("Cadastro feito com esse Nome"))

export { emitirCadastroUsuario };
