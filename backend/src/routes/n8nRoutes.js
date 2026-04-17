const express = require('express');
const { updateCandidateResult, getJobForN8n } = require('../controllers/n8nController');

const router = express.Router();

router.post('/update-result', updateCandidateResult);
router.get('/jobs/:job_id', getJobForN8n);

module.exports = router;
