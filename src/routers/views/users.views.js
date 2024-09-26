import { Router } from "express";
import { registerView } from "../../controllers/users.controller.js";
import isValidDataMid from "../../middlewares/isValidData.mid.js";

const usersViewsRouter = Router();

usersViewsRouter.get("/register",isValidDataMid.validUsers, registerView);

export default usersViewsRouter;  