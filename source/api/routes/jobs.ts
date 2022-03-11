import express from "express";
const router = express.Router();
import jobController from "../controllers/jobs";

router.get("/", jobController.getJobs);
router.post("/search", jobController.searchJob);
router.get("/scrape", jobController.scrapeJob);

export default router;
