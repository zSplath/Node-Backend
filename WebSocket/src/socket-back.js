import { findDocumentByName, updateDocumentByName, getAllDocs, createDocument, deleteDocumentByName } from "./dbDocs.js"
import io from "./server.js"


io.on("connection", (socket) => {
    console.log("\x1b[37mconnected with client:", socket.id)

    socket.on("getAllDocuments", async (returnDocuments) => {
        console.log(`client '${socket.id}' need  documents`);
        returnDocuments(await getAllDocs());
    });

    socket.on("createDocument", async (documentName) => {
        console.log(`new Document to Create ${documentName}`);
        if (await findDocumentByName(documentName) !== null) {
            console.log(`Document '${documentName}' was already created before`);
            socket.emit("documentAlreadyCreated", documentName)
        } else {
            console.log(`new Document to Create ${documentName}`);
            const newDocument = await createDocument(documentName);
            if (newDocument.acknowledged) {
                console.log(`new Document Created`);
                io.emit("documentCreated", documentName)
            }
        }
    });

    socket.on("setDocument", async (documentName, returnSavedText) => {
        socket.join(documentName)
        console.log("new Document Set:", documentName)
        
        const document = await findDocumentByName(documentName);
        if (document) {
            console.log("Document Text:", document.texto)
            returnSavedText(document.texto)
        }
    })

    socket.on("newText", async ({documentName, text}) => {
        console.log("new Text Event:",text)

        const updated = await updateDocumentByName(documentName, text);
        if (updated.modifiedCount) {
            socket.to(documentName).emit("savedText", text)
        }
    })

    socket.on("deleteDocument", async (documentName) => {

        console.log("deleting Document:", documentName)
        
        const deleted = await deleteDocumentByName(documentName);
        if (deleted.deletedCount) {
            console.log("Document deleted:", documentName)
            io.emit("deletedDocument", documentName)
            // socket.to(documentName).emit("deletedDocument")
        }
    })

    socket.on("disconnect", (motivo) => {
        console.log(`client '${socket.id}' desconnect by ${motivo}`);
    });
})