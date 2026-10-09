import express from "express";
import BookController from "../controllers/book.js";

const routes = express.Router();

routes.get("/books", BookController.getAllBooks)
routes.get("/books/search", BookController.getBookByAuthor)
routes.get("/books/:id", BookController.getBook)
routes.put("/books/:id", BookController.changeBook)
routes.post("/books", BookController.addBook)
routes.delete("/books/:id", BookController.removeBook)

export default routes