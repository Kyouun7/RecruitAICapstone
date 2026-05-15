const fs = require('fs');
const path = require('path');
const { uploadCVToGoogleDrive } = require('../services/googleDriveService');
const { saveCandidate } = require('../services/dbService');
const { sendToWebhook } = require('../services/webhookService');
const { isValidEmail, isValidPhone } = require('../utils/helpers');
const db = require('../db/connection');

async function createCandidate(req, res) {
    console.log('🔍 Controller called for candidate application');
    console.log('📄 File:', req.file?.filename);
    console.log('📋 Body:', req.body);
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
        if (errors.length > 0) return res.status(400).json({ success: false, errors });
        console.log('✅ Validation passed');
        
        console.log('📤 Uploading CV to Google Drive for:', nama);
        const uploadResult = await uploadCVToGoogleDrive(file, nama);
        console.log('✅ CV uploaded:', uploadResult.fileId);
        
        const candidate = await saveCandidate({ 
            nama, email, telepon, portofolio: portofolio || null, posisi, job_id, 
            cv_google_drive_id: uploadResult.fileId, 
            cv_original_name: file.originalname, 
            cv_url: uploadResult.url 
        });
        console.log('✅ Candidate saved:', candidate.candidate_id);
        
        console.log('📡 Preparing webhook payload...');
        // Send webhook with all necessary data
        sendToWebhook({ 
            candidate_id: candidate.candidate_id, 
            candidate_name: candidate.nama, 
            email: candidate.email, 
            job_id: candidate.job_id,  // IMPORTANT: Ensure job_id is included
            cv_path: uploadResult.url, 
            division: candidate.posisi 
        });
        
        console.log('✅ Application submitted:', candidate.candidate_id);
        res.status(201).json({ 
            success: true, 
            message: 'Lamaran berhasil dikirim', 
            data: candidate 
        });
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
}

async function getAllCandidates(req, res) {
    try {
        const { status, job_id, search, sort, page = 1, limit = 10 } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);
        let whereClause = 'WHERE 1=1';
        const params = [];
        if (status) { whereClause += ' AND status = ?'; params.push(status); }
        if (job_id) { whereClause += ' AND job_id = ?'; params.push(job_id); }
        if (search) { whereClause += ' AND (nama LIKE ? OR email LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
        const [countResult] = await db.query(`SELECT COUNT(*) as total FROM candidates ${whereClause}`, params);
        const total = countResult[0].total;
        let orderBy = 'ORDER BY created_at DESC';
        if (sort === 'score') orderBy = 'ORDER BY score DESC';
        const [candidates] = await db.query(`SELECT * FROM candidates ${whereClause} ${orderBy} LIMIT ? OFFSET ?`, [...params, parseInt(limit), offset]);
        res.status(200).json({ success: true, data: candidates, pagination: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) } });
    } catch (error) {
        console.error('Get candidates error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

async function getCandidateById(req, res) {
    try {
        const { id } = req.params;
        const [candidates] = await db.execute('SELECT * FROM candidates WHERE candidate_id = ? OR id = ?', [id, id]);
        if (candidates.length === 0) return res.status(404).json({ success: false, message: 'Kandidat tidak ditemukan' });
        res.status(200).json({ success: true, data: candidates[0] });
    } catch (error) {
        console.error('Get candidate error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function updateCandidateStatus(req, res) {
    try {
        const { id } = req.params;
        const { status, score, justifikasi, extracted_text } = req.body;
        const validStatus = ['pending', 'processing', 'processed', 'accepted', 'rejected'];
        if (!status || !validStatus.includes(status)) {
            return res.status(400).json({ success: false, message: 'Status tidak valid' });
        }
        const [existing] = await db.execute('SELECT * FROM candidates WHERE candidate_id = ? OR id = ?', [id, id]);
        if (existing.length === 0) return res.status(404).json({ success: false, message: 'Kandidat tidak ditemukan' });
        
        await db.execute(
            'UPDATE candidates SET status = ?, score = COALESCE(?, score), justifikasi = COALESCE(?, justifikasi), extracted_text = COALESCE(?, extracted_text) WHERE candidate_id = ? OR id = ?',
            [status, score, justifikasi, extracted_text, id, id]
        );
        res.status(200).json({ success: true, message: `Status kandidat berhasil diubah menjadi ${status}`, data: { id, status, score, justifikasi } });
    } catch (error) {
        console.error('Update candidate status error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function addRecruiterNote(req, res) {
    try {
        const { id } = req.params;
        const { note } = req.body;
        if (!note) return res.status(400).json({ success: false, message: 'Note wajib diisi' });
        const [existing] = await db.execute('SELECT * FROM candidates WHERE candidate_id = ? OR id = ?', [id, id]);
        if (existing.length === 0) return res.status(404).json({ success: false, message: 'Kandidat tidak ditemukan' });
        await db.execute('UPDATE candidates SET recruiter_note = ? WHERE candidate_id = ? OR id = ?', [note, id, id]);
        res.json({ success: true, message: 'Catatan berhasil ditambahkan' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { createCandidate, getAllCandidates, getCandidateById, updateCandidateStatus, addRecruiterNote };
