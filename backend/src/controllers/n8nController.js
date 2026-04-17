const db = require('../db/connection');

async function updateCandidateResult(req, res) {
    try {
        const { candidate_id, score, status, ai_reasoning } = req.body;

        if (!candidate_id || score === undefined || !status) {
            return res.status(400).json({
                success: false,
                message: 'candidate_id, score, dan status wajib diisi'
            });
        }

        const validStatuses = ['processed', 'accepted', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Status tidak valid. Gunakan: ${validStatuses.join(', ')}`
            });
        }

        const parsedScore = parseInt(score);
        if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 100) {
            return res.status(400).json({ success: false, message: 'Score harus antara 0-100' });
        }

        const query = `UPDATE candidates SET score = ?, status = ?, updated_at = NOW() WHERE candidate_id = ?`;
        const [result] = await db.execute(query, [parsedScore, status, candidate_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Kandidat tidak ditemukan' });
        }

        console.log(`[n8n] Updated candidate ${candidate_id}: score=${parsedScore}, status=${status}`);

        res.json({
            success: true,
            message: 'Hasil proses berhasil disimpan',
            data: { candidate_id, score: parsedScore, status }
        });

    } catch (error) {
        console.error('[n8n] updateCandidateResult error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

async function getJobForN8n(req, res) {
    try {
        const { job_id } = req.params;
        const [jobs] = await db.execute('SELECT * FROM jobs WHERE job_id = ?', [job_id]);

        if (jobs.length === 0) {
            return res.status(404).json({ success: false, message: 'Lowongan tidak ditemukan' });
        }

        res.json({ success: true, data: jobs[0] });

    } catch (error) {
        console.error('[n8n] getJobForN8n error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = { updateCandidateResult, getJobForN8n };
