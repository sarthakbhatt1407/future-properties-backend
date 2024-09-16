const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/check-user", userController.userExists);
router.post("/signup", userController.userRegistration);
router.post("/login", userController.userLogin);

module.exports = router;