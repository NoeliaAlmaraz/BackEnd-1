import usersManager from "../data/managers/users.manager.js";

async function readAllUsers(req, res, next) {
  try {
    let { role } = req.query;
    let users;
    if (role) {
      users = await usersManager.readAllUsers(role);
    } else {
      users = await usersManager.readAllUsers();
    }
    if (users.length > 0) {
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
    const readAllUsers = await usersManager.readAllUsers();
    return res.status(201).json({
      successMessage: responseManager.messageSuccess,
      user: responseManager.data,
    });
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
    return res.status(200).json({
      successMessage: responseManager.message,
      user: responseManager.users,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroyUser(req, res, next) {
  try {
    const { uid } = req.params;
    const responseManager = await usersManager.deleteUsers(uid);
    if (responseManager) {
      return res.status(200).json({
        message: responseManager.message,
        id: responseManager.id,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return next(error);
  }
}

async function loginUsers(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await usersManager.readOneUserByEmail(email);

    if (!user) {
      return next(new Error("User not found"));
    }

    if (email === user.email && password === user.password) {
      user.isOnline = true; 
      const updateOnline = await usersManager.updateUser(user.id, { isOnline: true });

      return res.redirect("/");
    } else {
      return res.redirect("/users/login?error=Invalid email or password");
    }
  } catch (error) {
    return next(error);
  }
}

async function logoutUsers(req, res, next) {
  try {
    const allUsers = await usersManager.readAllUsers(); 

    const usersOnline = allUsers.filter(user => user.isOnline); 

    for (const user of usersOnline) {
     
      user.isOnline = false;
      await usersManager.updateUser(user.id, { isOnline: false });
    }

    return res.redirect("/users/login"); 
  } catch (error) {
    return next(error);
  }
}

async function loginView(req, res, next) {
  try {
    const error = req.query.error; 
    return res.render("login", { error }); 
  } catch (error) {
    return next(error);
  }
}






async function registerUsers(req, res, next) {
  try {
    return res.render("register");
  } catch (error) {
    next(error);
  }
}

async function createUsersViews(req, res, next) {
  try {
    const users = req.body;
    const responseManager = await usersManager.createUsers(users);
    const readAllUsers = await usersManager.readAllUsers();

    if (responseManager.messageSuccess) {
      return res.render("login", {
        successMessageRegister: responseManager.messageSuccess,
      });
    }
  } catch (error) {
    returnnext(error);
  }
}


async function readOneUsersViews(req, res, next) {
  try {
    const { uid } = req.params;
    const users = await usersManager.readOneUsers(uid);
    if (users) {
      return res.render("myprofile", { user: users });
    } else {
      return res.render("index")
    }
  } catch (error) {
    return next(error);
  }
}

export {
  readAllUsers,
  readOneUsers,
  createUsers,
  updateUsers,
  destroyUser,
  loginUsers,
  logoutUsers,
  loginView,
  registerUsers,
  createUsersViews,
  readOneUsersViews
};
