import { Router } from "express";
import {  showProducts, showOneProducts,showProductsAdmin,createProductViews,deleteProductViews,updateProducts } from "../../controllers/products.controller.js";
import isValidData from "../../middlewares/isValidData.mid.js";


const productsViewsRouter = Router();

productsViewsRouter.get("/", showProducts);
productsViewsRouter.get("/admin",showProductsAdmin);
productsViewsRouter.post("/create",isValidData.validProducts,createProductViews);
productsViewsRouter.delete("/delete/:pid", deleteProductViews);
productsViewsRouter.put("/update/:pid",updateProducts);
productsViewsRouter.get("/:pid", showOneProducts);

export default productsViewsRouter; 
