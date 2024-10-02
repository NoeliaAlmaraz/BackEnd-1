import express from "express";
import { Server } from "socket.io";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import { createServer } from "http";
import socketCb from "./src/routers/index.socket.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import router from "./src/routers/index.router.js";

//http server
const server = express();
const port = 8080;
const ready = () => console.log(`Server is ready on port ${port}`);
const httpServer = createServer(server);
httpServer.listen(port, ready);

//tcp server
const socketServer = new Server(httpServer);
//para que se conecten de forma bi-direccional tengo que establñecer dos puntos de conexion. a nivel de backend es con socketServer.on("connection");

// y a nivel de frontend es con un script que se pone en el html const socket = io() mediante un archivo js que se encuentra en la carpeta public y se llama socket.js y poner el cnd
// en el html <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>

socketServer.on("connection", socketCb); // es la callback que esta establecida en index.socket.js en routers
export {socketServer};


//template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//middlewares
server.use(express.urlencoded({ extended: true }));
//para poder usar req.body
server.use(express.json());
server.use(morgan("dev"));
server.use(cors());
//para crear una carpeta statica de express
server.use("/public", express.static(__dirname + "/public"));

// routers
server.use(router);
server.use(errorHandler);
server.use(pathHandler);
