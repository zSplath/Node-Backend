import { docs } from "./dbConnection.js"

async function getAllDocs() {
    return await docs.find().toArray()
}

async function createDocument(documentName) {
    return await docs.insertOne({nome: documentName, texto: ""})
}

async function findDocumentByName(documentName) {
    return await docs.findOne({nome: documentName})
}

async function deleteDocumentByName(documentName) {
    return await docs.deleteOne({nome: documentName})
}

async function updateDocumentByName(documentName, text) {
    return await docs.updateOne({nome: documentName}, {$set: {texto: text}})
}

export { 
    getAllDocs, 
    createDocument, 
    findDocumentByName, 
    updateDocumentByName, 
    deleteDocumentByName
}