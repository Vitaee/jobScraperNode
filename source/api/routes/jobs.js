const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobs");

router.get("/", jobController.getJobs);
router.post("/search", jobController.searchJob);
router.get("/scrape", jobController.scrapeJob);
module.exports = router;
