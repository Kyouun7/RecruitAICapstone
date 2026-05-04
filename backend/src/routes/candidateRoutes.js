const express = require('express');
const upload = require('../middleware/upload');
const { 
    createCandidate, 
    getAllCandidates, 
    getCandidateById, 
    updateCandidateStatus,
    addRecruiterNote  
} = require('../controllers/candidateController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Public routes (tidak perlu login)
router.post('/candidates', upload.single('cv_file'), createCandidate);

// Protected routes (HR harus login)
router.get('/candidates', verifyToken, getAllCandidates);
router.get('/candidates/:id', verifyToken, getCandidateById);
router.put('/candidates/:id/status', verifyToken, updateCandidateStatus);
router.put('/candidates/:id/note', verifyToken, addRecruiterNote);
module.exports = router;
