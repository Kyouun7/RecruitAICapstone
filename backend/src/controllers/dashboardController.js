const db = require('../db/connection');

async function getLeaderboard(req, res) {
    try {
        const { job_id } = req.params;
        const [rows] = await db.execute(
            `SELECT candidate_id, nama, email, score, justifikasi, status 
             FROM candidates 
             WHERE job_id = ? AND score IS NOT NULL 
             ORDER BY score DESC`,
            [job_id]
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getDashboardStats(req, res) {
    try {
        const [statusCount] = await db.execute(`SELECT status, COUNT(*) as count FROM candidates GROUP BY status`);
        const [jobCount] = await db.execute(`SELECT j.title, j.job_id, COUNT(c.id) as total FROM jobs j LEFT JOIN candidates c ON j.job_id = c.job_id GROUP BY j.job_id`);
        const [avgScore] = await db.execute(`SELECT job_id, AVG(score) as avg_score FROM candidates WHERE score IS NOT NULL GROUP BY job_id`);
        res.json({ success: true, data: { statusCount, jobCount, avgScore } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getLeaderboard, getDashboardStats };
