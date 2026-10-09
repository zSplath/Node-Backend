import { author } from "../models/author.js";
import book from "../models/book.js";

class BookController {

    static async getAllBooks (req, res) {
        try {
            const bookList = await book.find({})
            res.status(200).json(bookList)
        } catch (e) {
            res.status(500).json({ message: `[Erro buscar lista de livros] ${e.message}`})
        }
    }

    static async getBook (req, res) {
        try {
            const found = await book.findById(req.params.id)
            res.status(200).json(found)
        } catch (e) {
            res.status(500).json({ message: `[Erro buscar livro] ${e.message}`})
        }
    }

    static async changeBook (req, res) {
        try {
            const id = req.params.id
            const before = await book.findByIdAndUpdate(id, req.body)
            const after = await book.findById(id)
            res.status(200).json({antes: before, depois: after})
        } catch (e) {
            res.status(500).json({ message: `[Erro mudar livro] ${e.message}`})
        }
    }
    
    static async addBook (req, res) {
        const authorID = req.body.author
        try {
            if (authorID) {
                const authorFound = await author.findById(authorID)
                req.body.author = authorFound._doc
            }
            const newBook = await book.create(req.body);
            res.status(201).json(newBook)
        } catch (e) {
            res.status(500).json({ message: `[Erro ao registrar novo livro] ${e.message}`})
        }
    }
    
    static async removeBook (req, res) {
        try {
            const deleted = await book.findByIdAndDelete(req.params.id)
            res.status(200).json(deleted)
        } catch (e) {
            res.status(500).json({ message: `[Erro deletar livro] ${e.message}`})
        }
    }

    static async getBookByAuthor (req, res) {
        const authorID = req.query.author
        try {
            const bookList = await book.find({ "author._id": authorID })
            res.status(200).json(bookList)
        } catch (e) {
            res.status(500).json({ message: `[Erro buscar lista de livros] ${e.message}`})
        }
    }
};

export default BookController;