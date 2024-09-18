import { Router } from "express";
import {
  getAllProducts,
  create,
  getOneProduct,
  update,
  destroyProduct,
} from "../../controllers/products.controllers.js";
import isValidData from "../../middlewares/isValidData.mid.js";

const productsApiRouter = Router();

productsApiRouter.get("/", getAllProducts);
// para crear .post
productsApiRouter.post("/",isValidData, create);
//server.get("/products/:title/:price/:stock", create);
productsApiRouter.get("/:pid", getOneProduct);
// para actualizar .put
productsApiRouter.put("/:pid", update);
// para borrar .delete
productsApiRouter.delete("/:pid", destroyProduct);

export default productsApiRouter;