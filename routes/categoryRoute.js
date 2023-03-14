/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const express = require('express');

const { getCategories, createCategory, updateCategory, deleteCategory, getOneCategory } = require("../controllers/categoryController")
const { middleware } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(middleware, getCategories).post(middleware, createCategory);
router.route("/:categoryId").put(middleware, updateCategory).delete(middleware, deleteCategory).get(middleware, getOneCategory);

module.exports = router;