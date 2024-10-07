

import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js";
import usersManager from "../data/managers/users.manager.js";


const router = Router();

router.use(isOnline);
router.use("/api", apiRouter);
router.use("/", viewsRouter);
router.get("/", index);

async function isOnline(req, res, next) {
  try {
    const users = await usersManager.readAllUsers();
    const onlineUser = users.filter(user => user.isOnline);
    res.locals.onlineUsers = onlineUser.map(user => ({
      id: user.id,
    }));

    console.log(res.locals.onlineUsers);
    next();
  } catch (error) {
    next(error);
  }
}

function index(req, res, next) {
  try {
    return res.status(200).json({ message: "Server ready" });
  } catch (error) {
    return next(error);
  }
}



export default router;