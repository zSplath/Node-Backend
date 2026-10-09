# API de Livraria: Erros, Validações e Buscas

API REST de **livros** e **autores** focada em boas práticas de tratamento de erros e consultas. Principais pontos trabalhados:

- **Tratamento de erros centralizado** com um middleware e classes de erro próprias (`BaseError`, `RequisicaoIncorreta`, `ErroValidacao`, `NotFound`)
- **Rota 404** para caminhos inexistentes
- **Validações no Mongoose**: campos obrigatórios, `enum`, `min`/`max` e validador personalizado, com mensagens em português
- **Validador global** para campos de texto vazios
- **Busca com filtros** combináveis (título, editora, número de páginas, nome do autor)
- **Paginação e ordenação** via middleware reutilizável
- **Autopopulate** para trazer os dados do autor junto com o livro
- ESLint configurado

## Tecnologias

- Node.js (ES Modules)
- Express
- Mongoose / MongoDB (+ mongoose-autopopulate)
- dotenv, nodemon, ESLint

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto:

   ```env
   MONGO_CONNECTION=mongodb+srv://<usuario>:<senha>@<cluster>/<banco>
   PORT=3000 # opcional, o padrão já é 3000
   ```

3. Inicie o servidor:

   ```bash
   npm run dev
   ```

A API sobe em `http://localhost:3000`.

## Rotas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/livros` | Lista livros (paginado) |
| GET | `/livros/busca` | Busca livros por filtros (paginado) |
| GET | `/livros/:id` | Busca um livro pelo id |
| POST | `/livros` | Cadastra um livro |
| PUT | `/livros/:id` | Atualiza um livro |
| DELETE | `/livros/:id` | Remove um livro |
| GET | `/autores` | Lista autores (paginado) |
| GET | `/autores/:id` | Busca um autor pelo id |
| POST | `/autores` | Cadastra um autor |
| PUT | `/autores/:id` | Atualiza um autor |
| DELETE | `/autores/:id` | Remove um autor |

### Paginação e ordenação

As listagens aceitam os parâmetros de query:

| Parâmetro | Padrão | Descrição |
|---|---|---|
| `limite` | `5` | Itens por página |
| `pag` | `1` | Página |
| `campoOrdenado` | `_id` | Campo usado na ordenação |
| `ordem` | `1` | `1` crescente, `-1` decrescente |

### Filtros da busca (`/livros/busca`)

`titulo` (busca parcial, sem diferenciar maiúsculas), `editora`, `minPaginas`, `maxPaginas` e `nomeAutor`.

## Testando

```bash
# Cadastrar um autor
curl -X POST http://localhost:3000/autores \
  -H "Content-Type: application/json" \
  -d '{"nome": "Machado de Assis", "nacionalidade": "Brasileira"}'

# Cadastrar um livro (editora aceita: "editora 1" ou "editora 2")
curl -X POST http://localhost:3000/livros \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Dom Casmurro", "autor": "<id-do-autor>", "editora": "editora 1", "numeroPaginas": 256}'

# Buscar com filtros, paginação e ordenação
curl "http://localhost:3000/livros/busca?titulo=dom&minPaginas=100&limite=2&pag=1&campoOrdenado=titulo&ordem=-1"

# Ver os erros tratados
curl -X POST http://localhost:3000/livros -H "Content-Type: application/json" -d '{}'   # 400: validação
curl http://localhost:3000/livros/id-invalido                                           # 400: id mal formatado
curl http://localhost:3000/rota-que-nao-existe                                          # 404
```
