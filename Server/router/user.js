// user route
const express = require("express");
const userControllers = require("../controller/userController");
const userAuth = require("../middleware/auth");
const router = express.Router();
// login route
router.post("/login", userControllers.userLoginContro);
router.get("/profile", userAuth.userProtect, (req, res) => {
  console.log("token verification done");
  res.json({ user: req.user });
});
module.exports = router;
