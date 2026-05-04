const db = require('../db/connection');

async function getHrDashboard(req, res) {
    try {
        // Total active jobs (is_active = true)
        const [totalJobs] = await db.execute('SELECT COUNT(*) as total FROM jobs WHERE is_active = true');
        // Total candidates
        const [totalCandidates] = await db.execute('SELECT COUNT(*) as total FROM candidates');
        // Hire rate: (accepted / total) * 100
        const [acceptedCount] = await db.execute('SELECT COUNT(*) as total FROM candidates WHERE status = "accepted"');
        const hireRate = totalCandidates[0].total > 0 
            ? Math.round((acceptedCount[0].total / totalCandidates[0].total) * 100) 
            : 0;
        // Interviews today (belum ada tabel interview, default 0)
        const interviewsToday = 0;

        res.json({
            success: true,
            data: {
                totalOpenings: totalJobs[0].total,
                totalCandidates: totalCandidates[0].total,
                hireRate: hireRate,
                interviewsToday: interviewsToday
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getHrDashboard };
