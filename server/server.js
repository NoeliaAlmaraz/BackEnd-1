import express from "express";
import {
  getAllProducts,
  create,
  getOneProduct,
  update,
  destroyProduct,
} from "./src/controllers/products.controllers.js";

try {
  const server = express();
  const port = 8000;
  const ready = () => console.log("Server ready");

  //obliga al servidor a usar la habilidad de urlencoded en express para habilitar
  //  la lectura de datos complejos en la url(parametros y consultas)
  server.use(express.urlencoded({ extended: true }));

  //abliga al servidor a usar la funcionalidad de recepcion y emision del formato json para poder
  //recibir objetos en la propiedad req.body y ademas se aplica json en toda la aplicacion
  server.use(express.json());

  server.listen(port, ready);

  // definir una ruta para leer datos .get
  server.get("/", index);
  server.get("/api/products", getAllProducts);
  // para crear .post
  server.post("/api/products", create);
  //server.get("/products/:title/:price/:stock", create);
  server.get("/api/products/:pid", getOneProduct);
  // para actualizar .put
  server.put("/api/products/:pid", update);
  // para borrar .delete
  server.delete("/api/products/:pid", destroyProduct);
} catch (error) {
  console.log(error);
}

function index(req, res) {
  try {
    return res.status(200).json({ mensaje: "Hola" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error" });
  }
}
