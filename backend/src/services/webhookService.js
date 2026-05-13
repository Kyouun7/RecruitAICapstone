const axios = require('axios');
require('dotenv').config();

async function sendToWebhook(data) {
    const url = process.env.N8N_WEBHOOK_URL;
    
    if (!url) {
        console.log(' Webhook URL not configured');
        return;
    }
    
    const payload = {
        candidate_id: data.candidate_id,
        candidate_name: data.candidate_name,
        email: data.email,
        job_id: data.job_id,
        cv_path: data.cv_path,
        division: data.division
    };
    
    console.log(` Sending to webhook: ${data.candidate_id} (${data.candidate_name}, ${data.email})`);
    
    axios.post(url, payload, { timeout: 5000 })
        .then(() => console.log(` Webhook sent: ${data.candidate_id}`))
        .catch(err => console.log(` Webhook failed: ${err.message}`));
}

module.exports = { sendToWebhook };
