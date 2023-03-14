/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const express = require('express');

const { login, register, getUsers, deleteUser, getOneUser, updateUser, updateProfile, getUserProfile } = require("../controllers/userController")
const { middleware } = require("../middleware/auth");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.route("/").get(middleware, getUsers).put(middleware, updateProfile);
router.route("/:userId").delete(middleware, deleteUser).get(middleware, getOneUser).put(middleware, updateUser);
router.route("/profile/me").get(middleware, getUserProfile);

module.exports = router;