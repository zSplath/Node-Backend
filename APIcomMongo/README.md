# API com MongoDB

API REST para cadastro de **livros** e **autores**, construída com Express 5 e Mongoose. Foi o primeiro projeto da formação: organização em camadas (rotas, controllers e models), conexão com o MongoDB e CRUD completo.

## Tecnologias

- Node.js (ES Modules)
- Express 5
- Mongoose / MongoDB
- dotenv
- nodemon

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto com a string de conexão do seu MongoDB:

   ```env
   MONGO_CONNECTION=mongodb+srv://<usuario>:<senha>@<cluster>/<banco>
   ```

3. Inicie o servidor:

   ```bash
   npm run dev
   ```

A API sobe em `http://localhost:3000`.

## Rotas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Teste de funcionamento |
| GET | `/books` | Lista todos os livros |
| GET | `/books/:id` | Busca um livro pelo id |
| GET | `/books/search?author=<id>` | Busca livros por autor |
| POST | `/books` | Cadastra um livro |
| PUT | `/books/:id` | Atualiza um livro |
| DELETE | `/books/:id` | Remove um livro |
| GET | `/author` | Lista todos os autores |
| GET | `/author/:id` | Busca um autor pelo id |
| POST | `/author` | Cadastra um autor |
| PUT | `/author/:id` | Atualiza um autor |
| DELETE | `/author/:id` | Remove um autor |

## Testando

Use Postman, Insomnia ou `curl`. Exemplo de fluxo:

```bash
# 1. Cadastrar um autor
curl -X POST http://localhost:3000/author \
  -H "Content-Type: application/json" \
  -d '{"name": "Machado de Assis", "nationality": "Brasileira"}'

# 2. Cadastrar um livro usando o id do autor retornado acima
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Dom Casmurro", "publisher": "Garnier", "price": 39.9, "pages": 256, "author": "<id-do-autor>"}'

# 3. Listar os livros
curl http://localhost:3000/books
```
