import { Router } from "express";
import {
  readAllUsers,
  readOneUsers,
  createUsers,
  updateUsers,
  destroyUser
} from "../../controllers/users.controller.js";
import isValidData from "../../middlewares/isValidData.mid.js";

const usersApiRouter = Router();

usersApiRouter.get("/", readAllUsers);
usersApiRouter.post("/",isValidData.validUsers, createUsers);
usersApiRouter.get("/:uid", readOneUsers);
usersApiRouter.put("/:uid", updateUsers);
usersApiRouter.delete("/:uid", destroyUser);

export default usersApiRouter;