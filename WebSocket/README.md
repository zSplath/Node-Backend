# Editor de Documentos em Tempo Real (WebSocket)

Aplicação de edição colaborativa de documentos: várias pessoas abrem o mesmo documento e veem o texto mudar em tempo real. A comunicação entre navegador e servidor é feita com **Socket.IO** e os documentos ficam salvos no **MongoDB**.

Funcionalidades:

- Listar, criar e excluir documentos, com a lista atualizada para todos os clientes conectados
- Editar um documento com sincronização em tempo real entre quem está nele (uso de *rooms* do Socket.IO)
- Persistência do texto no MongoDB

## Tecnologias

- Node.js (ES Modules)
- Express (servindo o front estático)
- Socket.IO
- MongoDB (driver oficial)
- HTML, CSS (Bootstrap) e JavaScript no front

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure a conexão com o MongoDB: em `src/dbConnection.js`, troque o texto `"stringdeconexão"` pela string de conexão do seu banco. O projeto usa o banco `websockets` e a coleção `docs`, que são criados automaticamente.

3. Inicie o servidor:

   ```bash
   npm run dev
   ```

Acesse `http://localhost:3000`.

## Testando

1. Abra `http://localhost:3000` em **duas abas** (ou dois navegadores).
2. Crie um documento em uma das abas. Ele aparece na lista das duas.
3. Abra o mesmo documento nas duas abas e digite em uma delas. O texto aparece na outra em tempo real.
4. Exclua o documento. Ele some da lista de todos os clientes.

## Eventos Socket.IO

| Evento (cliente → servidor) | Descrição |
|---|---|
| `getAllDocuments` | Solicita a lista de documentos |
| `createDocument` | Cria um documento |
| `setDocument` | Entra na sala de um documento e recebe o texto salvo |
| `newText` | Envia alterações do texto |
| `deleteDocument` | Exclui um documento |

| Evento (servidor → cliente) | Descrição |
|---|---|
| `documentCreated` / `documentAlreadyCreated` | Resultado da criação |
| `savedText` | Texto atualizado por outro cliente |
| `deletedDocument` | Documento excluído |
