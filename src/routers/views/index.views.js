import { Router } from "express";
import usersViewsRouter from "./users.views.js";
import productsViewsRouter from "./products.views.js";



const viewsRouter = Router();

viewsRouter.use("/products", productsViewsRouter)
viewsRouter.use("/users", usersViewsRouter)


viewsRouter.get("/",(req, res, next) => {
  try {
    res.render("index");
  } catch (error) {
    next(error);
  }
})

export default viewsRouter;