const { uploadCVToGoogleDrive } = require('../services/googleDriveService');
const { saveCandidate } = require('../services/dbService');
const { sendToWebhook } = require('../services/webhookService');
const { isValidEmail, isValidPhone } = require('../utils/helpers');
const db = require('../db/connection');

async function createCandidate(req, res) {
    console.log('Controller DIPANGGIL!');
    console.log('File:', req.file);
    console.log('Body:', req.body);

    try {
        const { nama, email, telepon, portofolio, posisi, job_id } = req.body;
        const file = req.file;

        const errors = [];
        if (!nama) errors.push('Nama wajib diisi');
        if (!email) errors.push('Email wajib diisi');
        if (email && !isValidEmail(email)) errors.push('Email tidak valid');
        if (!telepon) errors.push('Telepon wajib diisi');
        if (telepon && !isValidPhone(telepon)) errors.push('Telepon harus 10-15 digit');
        if (!posisi) errors.push('Posisi wajib diisi');
        if (!job_id) errors.push('Job ID wajib diisi');
        if (!file) errors.push('File CV wajib diupload');

        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        console.log('Memanggil uploadCVToGoogleDrive...');
        const uploadResult = await uploadCVToGoogleDrive(file, nama);
        console.log('Hasil upload:', uploadResult);

        const candidate = await saveCandidate({
            nama, email, telepon, portofolio: portofolio || null, posisi, job_id,
            cv_google_drive_id: uploadResult.fileId,
            cv_original_name: file.originalname,
            cv_url: uploadResult.url
        });

        // Fetch job details to enrich the webhook payload
        let jobData = {};
        try {
            const [jobs] = await db.execute('SELECT * FROM jobs WHERE job_id = ?', [job_id]);
            if (jobs.length > 0) jobData = jobs[0];
        } catch (err) {
            console.log('[Webhook] Could not fetch job details:', err.message);
        }

        let webhookEmail = candidate.email || email || '';
        if (!webhookEmail) {
            try {
                const [rows] = await db.execute(
                    'SELECT email FROM candidates WHERE candidate_id = ? LIMIT 1',
                    [candidate.candidate_id]
                );
                webhookEmail = rows[0]?.email || '';
            } catch (err) {
                console.log('[Webhook] Could not fetch candidate email:', err.message);
            }
        }

        if (!webhookEmail) {
            throw new Error('Candidate email is required before sending webhook');
        }

        sendToWebhook({
            candidate_id: candidate.candidate_id,
            candidate_name: nama,
            email: webhookEmail,
            job_id: candidate.job_id,
            job_title: jobData.title || posisi,
            job_description: jobData.description || '',
            key_responsibilities: jobData.key_responsibilities || '',
            minimum_qualifications: jobData.minimum_qualifications || '',
            threshold_score: jobData.threshold_score || 70,
            cv_path: uploadResult.url,
            division: posisi
        });

        res.status(201).json({
            success: true,
            message: 'Lamaran berhasil dikirim',
            data: candidate
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

module.exports = { createCandidate };
