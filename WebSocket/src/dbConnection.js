import { MongoClient } from "mongodb"

const client = new MongoClient("stringdeconexão")
let docs;

try {
    await client.connect();

    const db = client.db("websockets");
    docs = db.collection("docs");

    console.log("\x1b[34m[connection] mongodb connected\x1b[0m");
} catch (e) {
    console.log(e);
}

export { docs }