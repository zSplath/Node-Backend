import "dotenv/config"

import registrarEventosCadastro from "./registrarEventos/Cadastro.js";
import registrarEventosDocumento from "./registrarEventos/Documento.js";
import registrarEventosInicio from "./registrarEventos/Inicio.js";
import registrarEventosLogin from "./registrarEventos/Login.js";

import io from "./servidor.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

const nspUsuario = io.of("/usuarios")

nspUsuario.use(autorizarUsuario)

nspUsuario.on("connection", (socket) => {
  registrarEventosInicio(socket, nspUsuario)
  registrarEventosDocumento(socket, nspUsuario)
});

io.of("/").on("connection", (socket) => {
  registrarEventosCadastro(socket, io)
  registrarEventosLogin(socket, io)
});
