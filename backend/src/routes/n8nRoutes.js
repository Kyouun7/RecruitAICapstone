const express = require('express');
const db = require('../db/connection');
require('dotenv').config();

const router = express.Router();

// Middleware: validasi N8N_SECRET supaya hanya n8n yang bisa akses endpoint ini
function verifyN8nSecret(req, res, next) {
    const secret = req.headers['x-n8n-secret'] || req.body?.n8n_secret;
    const expected = process.env.N8N_SECRET;

    if (!expected) {
        // Kalau N8N_SECRET belum diset di .env, lewatkan (dev mode)
        console.warn('⚠️  N8N_SECRET not set in .env — n8n endpoint is unprotected!');
        return next();
    }

    if (secret !== expected) {
        return res.status(401).json({ success: false, message: 'Unauthorized: invalid n8n secret' });
    }

    next();
}

router.post('/update-result', verifyN8nSecret, async (req, res) => {
    try {
        const { candidate_id, score, status, justifikasi, extracted_text, email_status } = req.body;
        if (!candidate_id) return res.status(400).json({ success: false, message: 'candidate_id required' });
        
        // Update candidate
        await db.execute(
            'UPDATE candidates SET score = ?, justifikasi = ?, status = ?, extracted_text = COALESCE(?, extracted_text) WHERE candidate_id = ?',
            [score, justifikasi || null, status || 'processed', extracted_text || null, candidate_id]
        );
        
        // Ambil data kandidat dan job untuk bandingkan threshold
        const [candidateRows] = await db.execute('SELECT * FROM candidates WHERE candidate_id = ?', [candidate_id]);
        if (candidateRows.length > 0 && score !== undefined) {
            const candidate = candidateRows[0];
            const [jobRows] = await db.execute('SELECT threshold_score, title FROM jobs WHERE job_id = ?', [candidate.job_id]);
            const threshold = jobRows[0]?.threshold_score || 70;
            const finalStatus = score >= threshold ? 'accepted' : 'rejected';
            await db.execute('UPDATE candidates SET status = ? WHERE candidate_id = ?', [finalStatus, candidate_id]);
            
            // Catat email log jika dikirim dari n8n (opsional)
            if (email_status) {
                await db.execute('INSERT INTO email_logs (candidate_id, email_to, subject, status) VALUES (?, ?, ?, ?)', 
                    [candidate_id, candidate.email, 'Hasil Seleksi', email_status]);
            }
        }
        
        res.status(200).json({ success: true, message: 'Candidate updated successfully' });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

router.get('/jobs/:job_id', verifyN8nSecret, async (req, res) => {
    try {
        const { job_id } = req.params;
        const [jobs] = await db.execute('SELECT * FROM jobs WHERE job_id = ?', [job_id]);
        if (jobs.length === 0) return res.status(404).json({ success: false, message: 'Job not found' });
        res.status(200).json({ success: true, data: jobs[0] });
    } catch (error) {
        console.error('Get job error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
