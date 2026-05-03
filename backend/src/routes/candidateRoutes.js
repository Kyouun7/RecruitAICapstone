const express = require('express');
const upload = require('../middleware/upload');
const { createCandidate, getCandidatesByJob } = require('../controllers/candidateController');

const router = express.Router();

// Submit lamaran (publik)
router.post('/candidates', upload.single('cv_file'), createCandidate);

// Fetch kandidat berdasarkan job_id (untuk dashboard HR)
router.get('/candidates', getCandidatesByJob);

module.exports = router;
