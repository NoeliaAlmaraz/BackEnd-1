import express from "express";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import cors from "cors";
import { engine } from "express-handlebars";
import __dirname from './utils.js'
import { Server } from 'socket.io'
import {createServer} from 'http'
import socketCb from './src/routers/index.socket.js'

try {
  const server = express();
  const port = 8000;
  const ready = () => console.log("Server ready");
  const httpServer = createServer(server);
  const tcpServer = new Server(httpServer); 
  tcpServer.on('connection',socketCb)
  httpServer.listen(port, ready);

  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(morgan("dev"));
  server.use(cors());
  server.use("/public",express.static(__dirname + '/public'));

  server.engine('handlebars', engine())
  server.set('view engine', 'handlebars')
  server.set('views', __dirname+'/src/views')

  server.use(router);
  server.use(errorHandler)
  server.use(pathHandler); 
} catch (error) {
    console.log(error);
}
