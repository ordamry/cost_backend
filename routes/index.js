/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const express = require("express");

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getOneCategory,
} = require("../controllers/categoryController");
const {
  getCosts,
  createCost,
  updateCost,
  deleteCost,
  getOneCost,
} = require("../controllers/costController");
const { middleware } = require("../middleware/auth");
const { getReport } = require("../controllers/reportController");
const {
  login,
  register,
  getUsers,
  deleteUser,
  getOneUser,
  updateUser,
  updateProfile,
  getUserProfile,
  about,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.route("/about").get(middleware, about);
router.route("/users").get(middleware, getUsers).put(middleware, updateProfile);
router
  .route("/users/:user_id")
  .delete(middleware, deleteUser)
  .get(middleware, getOneUser)
  .put(middleware, updateUser);
router.route("/users/profile/me").get(middleware, getUserProfile);

router
  .route("/categories")
  .get(middleware, getCategories)
  .post(middleware, createCategory);
router
  .route("/categories/:categoryId")
  .put(middleware, updateCategory)
  .delete(middleware, deleteCategory)
  .get(middleware, getOneCategory);
router.route("/costs").get(middleware, getCosts);
router.route("/addcost").post(middleware, createCost);
router
  .route("/costs/:costId")
  .put(middleware, updateCost)
  .delete(middleware, deleteCost)
  .get(middleware, getOneCost);
router.route("/report").get(middleware, getReport);

module.exports = router;
