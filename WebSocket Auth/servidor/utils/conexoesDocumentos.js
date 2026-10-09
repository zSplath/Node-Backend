const conexoesDocumentos = []

function buscarConexao(nomeDocumento, nomeUsuario) {
    return conexoesDocumentos.find((conexao)=>{
        return conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario
    })
}

function adicionarConexao (documentoEusuario) {
    conexoesDocumentos.push(documentoEusuario);
}

function obterUsuariosPorDocumento (nome) {
    return conexoesDocumentos
        .filter((conexao)=>conexao.nomeDocumento === nome)
        .map((conexao)=> conexao.nomeUsuario);
}

function removerConexao (nomeDocumento, nomeUsuario) {
    const idx = conexoesDocumentos.findIndex((conexao)=>{
        return conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario
    })
    if (idx !== -1) {
        conexoesDocumentos.splice(idx, 1)
    }
}

export { adicionarConexao, obterUsuariosPorDocumento, removerConexao, buscarConexao}