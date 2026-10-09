import { author } from "../models/author.js";

class AuthorController {

    static async getAllAuthors (req, res) {
        try {
            const authorList = await author.find({})
            res.status(200).json(authorList)
        } catch (e) {
            res.status(500).json({ message: `[Erro buscar lista de autores] ${e.message}`})
        }
    }

    static async getAuthor (req, res) {
        try {
            const found = await author.findById(req.params.id)
            res.status(200).json(found)
        } catch (e) {
            res.status(500).json({ message: `[Erro buscar autor] ${e.message}`})
        }
    }

    static async changeAuthor (req, res) {
        try {
            const id = req.params.id
            const before = await author.findByIdAndUpdate(id, req.body)
            const after = await author.findById(id)
            res.status(200).json({antes: before, depois: after})
        } catch (e) {
            res.status(500).json({ message: `[Erro mudar autor] ${e.message}`})
        }
    }
    
    static async addAuthor (req, res) {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json(newAuthor)
        } catch (e) {
            res.status(500).json({ message: `[Erro ao registrar novo autor] ${e.message}`})
        }
    }
    
    static async removeAuthor (req, res) {
        try {
            const deleted = await author.findByIdAndDelete(req.params.id)
            res.status(200).json(deleted)
        } catch (e) {
            res.status(500).json({ message: `[Erro deletar autor] ${e.message}`})
        }
    }
};

export default AuthorController;