// import express
const express = require("express");

// import express router
const router = express.Router();

// import register controller
const registerController = require("../controllers/RegisterController");

// import login controller
const loginController = require("../controllers/LoginController");

// import validate register
const { validateRegister, validateLogin } = require("../utils/validators/auth");

// define routes for register
router.post("/register", validateRegister, registerController.register);

// define routes for login
router.post("/login", validateLogin, loginController.login);

// export routes
module.exports = router;
