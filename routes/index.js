// import express
const express = require("express");

// import express router
const router = express.Router();

// import verifyToken
const verifyToken = require("../middlewares/auth");

// import register controller
const registerController = require("../controllers/RegisterController");

// import login controller
const loginController = require("../controllers/LoginController");

// import users controller
const userController = require("../controllers/UserController");

// import validate register
const { validateRegister, validateLogin } = require("../utils/validators/auth");

// import validate users
const { validateUser } = require("../utils/validators/user");

// define routes for register
router.post("/register", validateRegister, registerController.register);

// define routes for login
router.post("/login", validateLogin, loginController.login);

// define routes for get users
router.get("/admin/users", verifyToken, userController.findusers);

// define routes create users
router.post(
  "/admin/users",
  verifyToken,
  validateUser,
  userController.createUser
);

// define routes for get user by id
router.get("/admin/users/:id", verifyToken, userController.findUserById);

// define routes for update user by id
router.put(
  "/admin/users/:id",
  verifyToken,
  validateUser,
  userController.updateUser
);

// define routes for delete user by id
router.delete("/admin/users/:id", verifyToken, userController.deleteUser);

// export routes
module.exports = router;
