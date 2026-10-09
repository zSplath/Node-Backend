import express from "express";
import books from "./books.js";
import authors from "./author.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send(" Teste"))
    
    app.use(express.json(), books, authors)
}

export default routes;