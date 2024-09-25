import { Router } from "express";
import productsViewsRouter from "./products.views.js";
import cartsViewsRouter from "./carts.views.js";
import usersViewsRouter from "./users.views.js";

const viewsRouter = Router();

viewsRouter.use("/products", productsViewsRouter);
viewsRouter.use("/carts", cartsViewsRouter);
viewsRouter.use("/users", usersViewsRouter);
viewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("index");
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;