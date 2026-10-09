# Formação Node.js Back-end

Projetos desenvolvidos durante a formação de back-end com Node.js da Alura. Cada pasta é um projeto independente, com seu próprio `package.json` e instruções de execução.

| Projeto | Descrição | Principais tecnologias |
|---|---|---|
| [APIcomMongo](APIcomMongo) | API REST de livros e autores | Express 5, Mongoose, MongoDB |
| [ErrosEBuscas](ErrosEBuscas) | API de livraria com tratamento de erros centralizado, validações, buscas por filtro e paginação | Express, Mongoose, ESLint |
| [OrmSequelize](OrmSequelize) | API de uma escola (pessoas, cursos, categorias e matrículas) usando ORM | Express, Sequelize, SQLite |
| [WebSocket](WebSocket) | Editor de documentos colaborativo em tempo real | Socket.IO, Express, MongoDB |
| [WebSocket Auth](WebSocket%20Auth) | Evolução do editor com cadastro, login e autenticação via JWT | Socket.IO, JWT, crypto (scrypt), MongoDB |

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- Para os projetos com MongoDB: uma instância local ou um cluster gratuito no [MongoDB Atlas](https://www.mongodb.com/atlas)

## Como rodar um projeto

```bash
cd <nome-do-projeto>
npm install
npm run dev
```

Veja o README de cada pasta para a configuração específica (variáveis de ambiente, banco de dados e rotas para testar).
