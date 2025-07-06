const express = require("express");
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// Public Authenticated Users 
router.get("/all", jobController.getAllJobs);

// Recruiters only 
router.post("/create", auth, role("recruiter"), jobController.createJob);
router.get("/my-jobs", auth, role("recruiter"), jobController.getMyPostedJobs);

// Candidate-only
router.post("/apply/:id", auth, role("candidate"), jobController.applyToJobs);
router.get("/my-applications", auth, role("candidate"), jobController.getAllApplication);

module.exports = router;