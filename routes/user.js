const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/check-user", userController.userExists);
router.post("/signup", userController.userRegistration);
router.post("/login", userController.userLogin);
router.post("/delete-user", userController.deleteUser);
router.get("/get-all-users", userController.getAllUsers);
router.post("/get-user-by-id", userController.getUserByUserID);

module.exports = router;
