import { Router } from "express";
import {
  readAllProducts,
   readOneProducts,
   createProducts,
   updateProducts,
   destroyProduct
} from "../../controllers/products.controller.js";
import isValidData from '../../middlewares/isValidData.mid.js'; 

const productsApiRouter = Router();

productsApiRouter.get("/", readAllProducts);
productsApiRouter.post("/",isValidData.validProducts, createProducts);
productsApiRouter.get("/:pid", readOneProducts);
productsApiRouter.put("/:pid", updateProducts);
productsApiRouter.delete("/:pid", destroyProduct);

export default productsApiRouter;