# API de Escola com Sequelize

API REST de uma escola de cursos, com **pessoas** (estudantes e docentes), **categorias**, **cursos** e **matrículas**, usando o ORM Sequelize sobre SQLite.

Principais pontos trabalhados:

- Migrations e seeders com o `sequelize-cli`
- Associações entre modelos (`hasMany` / `belongsTo`)
- Arquitetura em camadas: rotas, controllers e services, com classes base genéricas (`Controller` e `Service`) reaproveitadas por herança
- **Soft delete** (`paranoid`) em todas as tabelas
- **Escopos**: por padrão só retorna pessoas ativas, com escopo para listar todas
- Validações no modelo, incluindo validador de CPF
- **Transações**: cancelar uma pessoa também cancela as matrículas dela
- Consultas com operadores (`Op.gte`, `Op.lte`), contagem e agrupamento

## Tecnologias

- Node.js (CommonJS)
- Express
- Sequelize + sequelize-cli
- SQLite
- ESLint, nodemon

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. O banco SQLite já vem pronto em `src/database/db/db.sqlite`. Para recriá-lo do zero, apague o arquivo e rode:

   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

3. Inicie o servidor:

   ```bash
   npm run dev
   ```

A API sobe em `http://localhost:3000`.

## Rotas

### Pessoas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/pessoas` | Lista pessoas ativas |
| GET | `/pessoas/todos` | Lista todas as pessoas (ativas e inativas) |
| GET | `/pessoas/:id` | Busca uma pessoa |
| POST | `/pessoas` | Cadastra uma pessoa |
| PUT | `/pessoas/:id` | Atualiza uma pessoa |
| DELETE | `/pessoas/:id` | Remove uma pessoa (soft delete) |
| PUT | `/pessoas/:id/cancelar` | Desativa a pessoa e cancela as matrículas dela |

### Matrículas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/pessoas/:id/matriculas` | Matrículas ativas de um estudante |
| GET | `/pessoas/:id/matriculas/todos` | Todas as matrículas de um estudante |
| GET | `/pessoas/:id/matriculas/total` | Total de matrículas ativas |
| GET | `/pessoas/:estudante_id/matriculas/:id` | Busca uma matrícula |
| POST | `/pessoas/:id/matriculas` | Cria uma matrícula |
| PUT | `/pessoas/:estudante_id/matriculas/:id` | Atualiza uma matrícula |
| DELETE | `/pessoas/:estudante_id/matriculas/:id` | Remove uma matrícula |

### Cursos e categorias

| Método | Rota | Descrição |
|---|---|---|
| GET | `/cursos?data_inicial=AAAA-MM-DD&data_final=AAAA-MM-DD` | Lista cursos, com filtro opcional por data de início |
| GET | `/cursos/lotados` | Cursos com 2 ou mais matrículas ativas |
| GET / POST | `/cursos` , `/categorias` | Lista / cadastra |
| GET / PUT / DELETE | `/cursos/:id` , `/categorias/:id` | Busca / atualiza / remove |

## Testando

Com o banco populado pelos seeders:

```bash
# Listar pessoas ativas
curl http://localhost:3000/pessoas

# Matrículas ativas do estudante 1 e o total delas
curl http://localhost:3000/pessoas/1/matriculas
curl http://localhost:3000/pessoas/1/matriculas/total

# Cursos que começam em um intervalo de datas
curl "http://localhost:3000/cursos?data_inicial=2023-01-01&data_final=2023-12-31"

# Cursos lotados
curl http://localhost:3000/cursos/lotados

# Cancelar um estudante (transação: desativa a pessoa e cancela as matrículas)
curl -X PUT http://localhost:3000/pessoas/1/cancelar
```
