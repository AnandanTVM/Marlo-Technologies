const express = require("express");
const homeControllers = require("../controller/homeController");
const router = express.Router();
router.post("/add", homeControllers.AddUserContro);

module.exports = router;
