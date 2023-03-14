/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

const express = require('express');

const { middleware } = require("../middleware/auth");
const { getReport } = require("../controllers/reportController")

const router = express.Router();

router.route("/").get(middleware, getReport);

module.exports = router;