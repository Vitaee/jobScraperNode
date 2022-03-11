const express = require("express");
const router = express.Router();
require("express-async-errors");
import jobs from "./jobs";

router.use("/jobs", jobs);
export default router;
