import { salvarCookie } from "../utils/cookies.js";
import {  } from "./login.js";

const socket = io();

function emitirAutenticarUsuario(data) {
  socket.emit("login_usuario", data);
}

socket.on("logado", (token) => {
  salvarCookie("token", token)

  alert("Logado")
  window.location.href = "/"
})
socket.on("login_erro", () => alert("Nome ou senha Incorreto(s)"))

export { emitirAutenticarUsuario };
