//para crear y configurar los enrutadores principales de la programacion backend
//el mas importanmte es el de la api (todos los enrrutadores de los recursos, para gestionarlos)
// otro que suele estar es el de vistas

import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewsRouter);
// definir una ruta para leer datos .get
apiRouter.get("/", index);

function index(req, res) {
  try {
    return res.status(200).json({ mensaje: "Hola" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error" });
  }
}

export default router;
