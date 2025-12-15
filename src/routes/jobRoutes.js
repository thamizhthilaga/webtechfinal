const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticateToken, checkRole } = require('../middleware/auth');

// Main jobs page
router.get('/', authenticateToken, checkRole('student'), jobController.jobsPage);

// API endpoint to fetch all jobs as JSON
router.get('/all', authenticateToken, checkRole('student'), jobController.getAllJobsApi);

// Info-only page showing all jobs (no save actions)
router.get('/info', authenticateToken, checkRole('student'), jobController.jobsInfoPage);

// Job detail page
router.get('/job/:jobId', authenticateToken, jobController.jobDetail);

// Save job
router.post('/save', authenticateToken, checkRole('student'), jobController.saveJob);

// Saved jobs
router.get('/saved', authenticateToken, checkRole('student'), jobController.savedJobs);

module.exports = router;
