

import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js";


const router = Router();

router.use("/api", apiRouter);
router.use("/", viewsRouter);
router.get("/", index);

function index(req, res, next) {
  try {
    return res.status(200).json({ message: "Server ready" });
  } catch (error) {
    return next(error);
  }
}


export default router;