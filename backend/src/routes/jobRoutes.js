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

// PROTECTED: spesifik routes dulu SEBELUM /:id
router.get('/hr/my-jobs', verifyToken, getMyJobs);

// PUBLIC: siapa pun bisa lihat semua job & detail job
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// PROTECTED: hanya HR yang bisa create, update, delete
router.post('/', verifyToken, createJob);
router.put('/:id', verifyToken, updateJob);
router.delete('/:id', verifyToken, deleteJob);

module.exports = router;