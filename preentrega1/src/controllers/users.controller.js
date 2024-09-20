import productsManager from "../data/managers/products.manager";
import usersManager from "./../data/managers/users.manager.js";
import { createServer } from "http";

async function readAllUsers(req, res, next) {
  try {
    let { role } = req.query;
    let users;
    if (role) {
      users = await usersManager.readAllUsers(role);
    } else {
      users = await usersManager.readAllUsers();
    }

    if (users.legth > 0) {
      return res.status(200).json({ message: "Operational users", users });
    } else {
      return res
        .status(404)
        .json({ message: "There are no users with that role" });
    }
  } catch (error) {
    return next(error);
  }
}

async function readOneUsers(req, res, next) {
  try {
    const { uid } = req.params;
    const users = await usersManager.readOneUsers(uid);
    if (users) {
      return res.status(200).json({ message: "User found", users });
    } else {
      return res.status(200).json({ message: "User not found" });
    }
  } catch (error) {
    return next(error);
  }
}

async function createUsers(req, res, next) {
  try {
    const users = req.body;
    const responseManager = await usersManager.createUsers(users);
    return res.status(201).json({ message: "User created", responseManager });
  } catch (error) {
    return next(error);
  }
}

async function updateUsers(req, res, next) {
  try {
    const { uid } = req.params;
    const upUsers = req.body;
    const responseManager = await usersManager.updateUsers(uid, upUsers);
    if (!responseManager) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Updated user", responseManager });
  } catch (error) {
    return next(error);
  }
}

async function destroyUser(req, res, next) {
  try {
    const { uid } = req.params;
    const responseManager = await usersManager.deleteUsers(uid);
    return res.status(200).json({ message: "Removed user", responseManager });
  } catch (error) {
    return next(error);
  }
}

export { readAllUsers, readOneUsers, createUsers, updateUsers, destroyUser };
