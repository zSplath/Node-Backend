import express from "express"
import url from "url"
import path from "path"
import http from "http"
import { Server } from "socket.io"
import "./dbConnection.js"

const app = express();
const port = process.env.port || 3000;

const mainPath = url.fileURLToPath(import.meta.url)
const publicDirectory = path.join(mainPath, "../../", "public");
app.use(express.static(publicDirectory))

const httpServer = http.createServer(app)
httpServer.listen(port, () => console.log(`\x1b[34m[open] listening to port '${port}'\x1b[0m`))
const io = new Server(httpServer)

export default io

