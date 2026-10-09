import { emitNewText, emitSetDocument, emitDeleteDocument } from "./socket-front-documento.js";

const params = new URLSearchParams(window.location.search);
const documentName = params.get("nome");
const documentTitle = document.getElementById("titulo-documento");
documentTitle.textContent = documentName || 'Documento sem título';
emitSetDocument(documentName);

const deletebutton = document.getElementById("excluir-documento");
const textEditor = document.getElementById("editor-texto");

textEditor.addEventListener("keyup", () => {
    emitNewText({ 
        text: textEditor.value, 
        documentName:documentName
    })
})

deletebutton.addEventListener("click", () => {
    emitDeleteDocument(documentName)
})

function updateLocalText (text) {
    textEditor.value = text
}

function closeTab (name) {
    if (name === documentName) {
        alert(`Documento ${name} foi excluído`)
        window.location.href = "/"
    }
}

export { updateLocalText, closeTab }