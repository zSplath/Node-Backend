import express from "express";
import AuthorController from "../controllers/author.js";

const routes = express.Router();

routes.get("/author", AuthorController.getAllAuthors)
routes.get("/author/:id", AuthorController.getAuthor)
routes.put("/author/:id", AuthorController.changeAuthor)
routes.post("/author", AuthorController.addAuthor)
routes.delete("/author/:id", AuthorController.removeAuthor)

export default routes