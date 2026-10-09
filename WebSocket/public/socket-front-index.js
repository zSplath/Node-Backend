import { addDocumentLink, removeDocumentLink } from "./index.js";
const socket = io();

socket.emit("getAllDocuments", (docs) => docs.forEach(doc => addDocumentLink(doc.nome)))

function postDocument(documentName) {
    socket.emit("createDocument", documentName)
}

socket.on("documentCreated", (documentName) => addDocumentLink(documentName))
socket.on("documentAlreadyCreated", (documentName) => alert(`Documento '${documentName}' já existe`))
socket.on("deletedDocument", (documentName) => removeDocumentLink(documentName))

export {postDocument}