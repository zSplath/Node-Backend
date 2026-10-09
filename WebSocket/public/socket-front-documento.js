import { closeTab, updateLocalText } from "./documento.js";

const socket = io();

function emitSetDocument(document) {
    socket.emit("setDocument",document, (text) => updateLocalText(text))
}

function emitNewText(json) {
    socket.emit("newText", json)
}

function emitDeleteDocument(documentName) {
    socket.emit("deleteDocument", documentName)
}

socket.on("savedText", (text) => {
    updateLocalText(text)
})

socket.on("deletedDocument", (documentName) => {
    closeTab(documentName)
})

export { emitNewText, emitSetDocument, emitDeleteDocument }