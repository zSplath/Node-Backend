# Editor de Documentos com Autenticação (WebSocket + JWT)

Evolução do [editor em tempo real](../WebSocket) com **cadastro**, **login** e **autorização**. Só usuários autenticados acessam os documentos, e cada documento mostra quem está conectado nele.

Principais pontos trabalhados:

- Cadastro de usuários com senha protegida por **hash + salt** (`scrypt` do módulo `crypto`)
- Login gerando um **JWT** (validade de 1 hora) salvo em cookie
- **Namespaces** do Socket.IO: `/` para cadastro e login (público) e `/usuarios` para documentos (protegido)
- **Middleware de autorização** que valida o JWT na conexão do socket
- Lista de usuários conectados em cada documento, impedindo o mesmo usuário de abrir o documento duas vezes
- Eventos organizados em módulos (`registrarEventos/`)

## Tecnologias

- Node.js (ES Modules)
- Express (servindo o front estático)
- Socket.IO
- MongoDB (driver oficial)
- jsonwebtoken, dotenv
- HTML, CSS (Bootstrap) e JavaScript no front

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto com a chave usada para assinar os tokens (qualquer texto longo e aleatório):

   ```env
   JWT_KEY=sua-chave-secreta
   ```

3. Configure a conexão com o MongoDB: em `servidor/db/dbConnect.js`, troque o texto `"stringdeconexão"` pela string de conexão do seu banco. O projeto usa o banco `alura-websockets`, com as coleções `documentos` e `usuarios`.

4. Inicie o servidor:

   ```bash
   npm run dev
   ```

Acesse `http://localhost:3000`.

## Testando

1. Acesse `http://localhost:3000`. Sem estar logado, você é redirecionado para o login.
2. Clique em **Faça o cadastro** e crie um usuário.
3. Faça login. O token JWT fica salvo no cookie `token`.
4. Crie e abra um documento. A lateral mostra os usuários conectados nele.
5. Em outro navegador (ou em uma aba anônima), cadastre e logue com um **segundo usuário** e abra o mesmo documento. A edição é sincronizada em tempo real e os dois aparecem na lista de conectados.
6. Clique em **Logout** (ou apague o cookie): o acesso aos documentos é bloqueado.
