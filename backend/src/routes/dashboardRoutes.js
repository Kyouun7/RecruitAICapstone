const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { getHrDashboard } = require('../controllers/dashboardHrController');

const router = express.Router();

router.get('/hr', verifyToken, getHrDashboard);

module.exports = router;
