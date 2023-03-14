/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

const express = require('express');

const { getCosts, createCost, updateCost, deleteCost, getOneCost } = require("../controllers/costController")
const { middleware } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(middleware, getCosts).post(middleware, createCost);
router.route("/:costId").put(middleware, updateCost).delete(middleware, deleteCost).get(middleware, getOneCost);

module.exports = router;