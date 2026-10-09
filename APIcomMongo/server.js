// import http from "http";
// const endpoints = {
//     "/": " Teste",
//     "/books": " Teste livros",
//     "/writers": " Teste autores"
// }

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plan" });
//     res.end(endpoints[req.url])
// });

import "dotenv/config";
import app from "./src/app.js";

const PORT = 3000;


app.listen(PORT, () => {
    console.log(` Aberto na porta ${PORT}`);
});