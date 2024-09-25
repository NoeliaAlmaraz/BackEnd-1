import { Router } from "express";
import { showProducts, showOneProducts } from "../../controllers/products.controller.js";


const productsViewsRouter = Router();

productsViewsRouter.get("/", showProducts);
productsViewsRouter.get("/:pid", showOneProducts);

export default productsViewsRouter;