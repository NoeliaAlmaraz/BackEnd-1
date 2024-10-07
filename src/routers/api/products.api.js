import { Router } from "express";
import {
    createProduct,
    readAllProducts,
    readOneProducts,
    updateProducts,
    deleteProduct,
} from "../../controllers/products.controller.js";
import isValidData from '../../middlewares/isValidData.mid.js'; 


const productsApiRouter = Router();


productsApiRouter.delete("/:pid", deleteProduct);
productsApiRouter.get("/", readAllProducts);
productsApiRouter.post("/",isValidData.validProducts, createProduct);
productsApiRouter.get("/:pid", readOneProducts);
productsApiRouter.put("/:pid", updateProducts);


export default productsApiRouter;