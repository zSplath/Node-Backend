import { postDocument } from "./socket-front-index.js";

const documentList = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocument = document.getElementById("input-documento");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    postDocument(inputDocument.value);
    inputDocument.value = "";
})

function addDocumentLink(documentName) {
    documentList.innerHTML += `
      <a
        href="documento.html?nome=${documentName}"
        class="list-group-item list-group-item-action"
        id="documento-${documentName}"
      >
        ${documentName}
      </a>
    `;
}

function removeDocumentLink(documentName) {
    documentList.removeChild(document.getElementById(`documento-${documentName}`))
}


export { addDocumentLink, removeDocumentLink }