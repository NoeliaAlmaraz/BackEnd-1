import express from "express";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

try {
  const server = express();
  const port = 8000;
  const ready = () => console.log("Server ready");
  server.listen(port, ready);
  //obliga al servidor a usar la habilidad de urlencoded en express para habilitar
  //  la lectura de datos complejos en la url(parametros y consultas)
  server.use(express.urlencoded({ extended: true }));

  //abliga al servidor a usar la funcionalidad de recepcion y emision del formato json para poder
  //recibir objetos en la propiedad req.body y ademas se aplica json en toda la aplicacion
  server.use(express.json());

  //morgan es un middleware de terceros que me permite ver los datos de la peticion y respuesta en la consola
  server.use(morgan("dev"));

  //cors es un middleware de terceros que me permite permitir la comunicacion entre el front y el back(incompatibilidad de puertos)
  server.use(cors());

  //Es un middleware que me permite manejar errores de manera mas eficiente
  server.use(errorHandler);

  //pathHandler es un middleware que me permite manejar los errores derutas de manera mas eficiente
  server.use(pathHandler);

  //obligo a mi servidor ha usar las rutas de los enrutadores
  server.use(router);
} catch (error) {
  console.log(error);
}
