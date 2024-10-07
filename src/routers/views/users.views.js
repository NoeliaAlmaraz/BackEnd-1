import { Router } from "express";
import { loginView, loginUsers, registerUsers, createUsersViews,readOneUsersViews,logoutUsers } from "../../controllers/users.controller.js";
import isValidData from "../../middlewares/isValidData.mid.js";

const usersViewsRouter = Router();
usersViewsRouter.get("/login", loginView);
usersViewsRouter.post("/login", loginUsers);
usersViewsRouter.get("/logout", logoutUsers);
usersViewsRouter.get("/register",registerUsers);
usersViewsRouter.post("/register",isValidData.validUsers,createUsersViews);
usersViewsRouter.get("/myprofile/:uid",readOneUsersViews);
usersViewsRouter.get("/:uid",readOneUsersViews);

export default usersViewsRouter;