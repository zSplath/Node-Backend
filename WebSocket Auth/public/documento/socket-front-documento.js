import { obtercookie } from "../utils/cookies.js";
import { alertarERedirecionar, atualizarUsuariosAtivos, atualizaTextoEditor, tratarAutorizacao } from "./documento.js";

const socket = io("/usuarios", {
  auth: {
    token: obtercookie("token")
  }
});

socket.on("connect_error", (erro) => {
  alert(erro);
  window.location.href = "/login"
})

socket.on("nome_logado", tratarAutorizacao)

function selecionarDocumento(dados) {
  socket.emit("selecionar_documento", dados, (texto) => {
    atualizaTextoEditor(texto);
  });
}

socket.on("usuario_ja_conectado", () => {
  alert("Documento está aberto em outra aba")
  window.location.href = "/"
})

socket.on("usuarios_no_documento", atualizarUsuariosAtivos)

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
