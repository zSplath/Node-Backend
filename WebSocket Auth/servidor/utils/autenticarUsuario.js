import { scryptSync, timingSafeEqual } from "crypto"

function autenticarUsuario (usuario, senha) {
    const hashGerada = scryptSync(senha, usuario.salSenha, 64);
    const hashSalva = Buffer.from(usuario.hashSenha, "hex")

    return timingSafeEqual(hashGerada, hashSalva)
}

export default autenticarUsuario