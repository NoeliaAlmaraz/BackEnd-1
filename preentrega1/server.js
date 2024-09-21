import express from "express";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import cors from "cors";

try {
  const server = express();
  const port = 8000;
  const ready = () => console.log("Server ready");
  server.listen(port, ready);

  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(morgan("dev"));
  server.use(cors());
  server.use(router);
  server.use(errorHandler)
  server.use(pathHandler);
} catch (error) {
    console.log(error);
}
