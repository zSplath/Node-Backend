import express from "express";
import dbConnection from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await dbConnection();
connection.on("error", (e) => console.error("erro: ", e))
connection.once("open", () => console.log(" Mongo Conectado"))

const app = express();
routes(app)

// app.use(express.json());

// const books = [
//     {
//         id: 1,
//         title: "Harry Potter"
//     },
//     {
//         id: 2,
//         title: "Harry Potter 2"
//     }
// ]

// function getBookID(id) {
//     return books.findIndex((book) => book.id === Number(id))
// }

// app.get("/", (req, res) => {
//     res.status(200).send(" Teste")
// })

// app.get("/books", async (req, res) => {
//     const bookList = await book.find({})
//     res.status(200).json(bookList)
// })

// app.get("/books/:id", (req, res) => {
//     res.status(200).json(books[getBookID(req.params.id)])
// })

// app.post("/books", (req, res) => {
//     books.push(req.body)
//     res.status(201).json(books[books.length - 1])
// })

// app.put("/books/:id", (req, res) => {
//     const bookID = getBookID(req.params.id)
//     books[bookID].title = req.body.title;
//     res.status(200).json(books[bookID])
// })

// app.delete("/books/:id", (req, res) => {
//     const bookID = getBookID(req.params.id)
//     const deleted = books[bookID]
//     books.splice(bookID, 1)
//     res.status(200).json(deleted)
// })

export default app