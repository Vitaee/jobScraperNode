import express from "express";
const router = express.Router();
import jobController from "../controllers/jobs";

router.get("/", jobController.getJobs);
router.get("/search", jobController.searchJob);
router.get("/scrape", jobController.scrapeJob);
router.get("/sort", jobController.sortJob);

export default router;
