const express = require('express');
const { verifyToken } = require('../middleware/auth');
const {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
} = require('../controllers/jobController');

const router = express.Router();

//  PUBLIC: siapa pun bisa lihat detail job (halaman apply)
router.get('/:id', getJobById);

//  PROTECTED: hanya HR yang bisa create, list all, update, delete
router.post('/', verifyToken, createJob);
router.get('/', verifyToken, getAllJobs);
router.put('/:id', verifyToken, updateJob);
router.delete('/:id', verifyToken, deleteJob);

module.exports = router;
