// user route
const express = require("express");
const userControllers = require("../controller/userController");
const router = express.Router();
// login route
router.post("/login", userControllers.userLoginContro);

module.exports = router;
