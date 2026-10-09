import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    titulo: {
      type: String, required: [true, "titulo é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'autores', 
      required: [true, "autor é obrigatório"],
      autopopulate: true
    },
    editora: {
      type: String, 
      required: [true, "editora é obrigatório"],
      enum: {
        values: ["editora 1","editora 2"],
        message: "Editora ({VALUE}) não cadastrada"
      }
    },
    numeroPaginas: {
      type: Number, 
      min:[1, "número de páginas ({VALUE}) deve ser maior que 0"], 
      max:[10000, "número de páginas ({VALUE}) deve ser menor que 10000"],
      validate: {
        validator: (value) => {
          return Number.isInteger(value) 
        },
        message: "número de páginas ({VALUE}) tem que ser inteiro"
      }
    }
  }
);

livroSchema.plugin(autopopulate);
const livros= mongoose.model('livros', livroSchema);

export default livros;