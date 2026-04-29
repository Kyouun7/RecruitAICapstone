const express = require('express');
const { verifyToken } = require('../middleware/auth');
const {
    createJob,
    getAllJobs,
    getMyJobs,
    getJobById,
    updateJob,
    deleteJob
} = require('../controllers/jobController');

const router = express.Router();

// === PROTECTED ROUTES (HR/Admin only) ===
router.post('/', verifyToken, createJob);
router.get('/hr/my-jobs', verifyToken, getMyJobs);
router.put('/:id', verifyToken, updateJob);
router.delete('/:id', verifyToken, deleteJob);

// === PUBLIC ROUTES ===
router.get('/', getAllJobs);
router.get('/:id', getJobById);

module.exports = router;
