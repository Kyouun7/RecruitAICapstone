const axios = require('axios');
const db = require('../db/connection');
require('dotenv').config();

/**
 * Fetch job details by job_id
 */
async function getJobDetails(job_id) {
    try {
        const [jobs] = await db.execute(
            `SELECT job_id, title, description, threshold_score, 
                    key_responsibilities, minimum_qualifications 
             FROM jobs WHERE job_id = ?`,
            [job_id]
        );
        
        if (jobs.length === 0) {
            console.warn(`⚠️  WARNING: Job not found in database: ${job_id}`);
            return null;
        }
        
        return jobs[0];
    } catch (error) {
        console.error(`❌ Error fetching job details for ${job_id}:`, error.message);
        return null;
    }
}

/**
 * Send candidate + job data to n8n webhook
 * @param {Object} data - Should contain: candidate_id, candidate_name, email, job_id, cv_path, division
 */
async function sendToWebhook(data) {
    const url = process.env.N8N_WEBHOOK_URL;
    
    if (!url) {
        console.warn('⚠️  N8N_WEBHOOK_URL not configured - webhook not sent');
        return;
    }
    
    // Validate required fields
    const requiredFields = ['candidate_id', 'candidate_name', 'email', 'job_id', 'cv_path', 'division'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        console.error(`❌ Error: Missing required fields in webhook payload: ${missingFields.join(', ')}`);
        return;
    }
    
    try {
        // Fetch full job details
        const jobDetails = await getJobDetails(data.job_id);
        
        // Build complete payload
        const payload = {
            candidate_id: data.candidate_id,
            candidate_name: data.candidate_name,
            email: data.email,
            job_id: data.job_id,
            job_title: jobDetails?.title || data.division || 'Unknown Position',
            job_description: jobDetails?.description || '',
            key_responsibilities: jobDetails?.key_responsibilities || '',
            minimum_qualifications: jobDetails?.minimum_qualifications || '',
            threshold_score: jobDetails?.threshold_score || 70,
            division: data.division,
            cv_path: data.cv_path
        };
        
        // Validate that critical job fields are present
        if (!jobDetails?.description) {
            console.warn(`⚠️  WARNING: Job description missing for job_id=${data.job_id}`);
        }
        if (!jobDetails?.key_responsibilities) {
            console.warn(`⚠️  WARNING: Key responsibilities missing for job_id=${data.job_id}`);
        }
        if (!jobDetails?.minimum_qualifications) {
            console.warn(`⚠️  WARNING: Minimum qualifications missing for job_id=${data.job_id}`);
        }
        
        console.log(`📤 Webhook Payload for ${data.candidate_id}:`);
        console.log(JSON.stringify(payload, null, 2));
        
        // Send to webhook
        axios.post(url, payload, { timeout: 5000 })
            .then(() => {
                console.log(`✅ Webhook sent successfully: ${data.candidate_id}`);
            })
            .catch(err => {
                console.error(`❌ Webhook request failed for ${data.candidate_id}: ${err.message}`);
            });
    } catch (error) {
        console.error(`❌ Unexpected error in sendToWebhook:`, error.message);
    }
}

module.exports = { sendToWebhook };
