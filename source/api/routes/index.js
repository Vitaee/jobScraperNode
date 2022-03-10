const express = require("express");
const router = express.Router();
require("express-async-errors");
const jobs = require("./jobs");

router.use("/jobs", jobs);
module.exports = router;
