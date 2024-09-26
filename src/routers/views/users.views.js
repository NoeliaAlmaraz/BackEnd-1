import { Router } from "express";
import { registerView,showOneUsers,showUsers } from "../../controllers/users.controller.js";


const usersViewsRouter = Router();

usersViewsRouter.get("/register", registerView);
usersViewsRouter.get("/:uid", showOneUsers);
usersViewsRouter.get("/", showUsers);


export default usersViewsRouter;  