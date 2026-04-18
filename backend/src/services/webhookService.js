const axios = require('axios');
require('dotenv').config();

async function sendToWebhook(data) {
    const url = process.env.N8N_WEBHOOK_URL;

    if (!url) {
        console.log('[Webhook] N8N_WEBHOOK_URL not configured, skipping');
        return;
    }

    const payload = {
        candidate_id: data.candidate_id,
        candidate_name: data.candidate_name || '',
        email: data.email || '',
        job_id: data.job_id,
        job_title: data.job_title || data.division || '',
        job_description: data.job_description || '',
        key_responsibilities: data.key_responsibilities || '',
        minimum_qualifications: data.minimum_qualifications || '',
        threshold_score: data.threshold_score || 70,
        cv_path: data.cv_path,
        division: data.division || ''
    };

    axios.post(url, payload, { timeout: 5000 })
        .then(() => console.log(`[Webhook] Sent candidate ${data.candidate_id} to n8n`))
        .catch(err => console.log(`[Webhook] Failed for ${data.candidate_id}: ${err.message}`));
}

module.exports = { sendToWebhook };
