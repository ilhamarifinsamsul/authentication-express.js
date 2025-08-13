// import express
const express = require("express");

// import express router
const router = express.Router();

// import register controller
const registerController = require("../controllers/RegisterController");

// import validate register
const { validateRegister } = require("../utils/validators/auth");

// define routes for register
router.post("/register", validateRegister, registerController.register);

// export routes
module.exports = router;
