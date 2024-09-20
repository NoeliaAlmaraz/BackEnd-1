import express from "express";
import errorHandler from "./src/middlewares/errorHandler.mid.js";

try {
  const server = express();
  const port = 8000;
  const ready = () => console.log("Server ready");
  server.listen(port, ready);

  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(errorHandler)
} catch (error) {
    console.log(error);
}
