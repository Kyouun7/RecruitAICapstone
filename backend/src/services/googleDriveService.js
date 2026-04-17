const { google } = require('googleapis');
const stream = require('stream');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

async function getOAuthClient() {
    // Strategy 1: use token.json + client_secret.json files (local dev with auth.js)
    const tokenPath = path.join(process.cwd(), 'token.json');
    const credentialsPath = path.join(process.cwd(), 'client_secret.json');

    if (fs.existsSync(tokenPath) && fs.existsSync(credentialsPath)) {
        const token = JSON.parse(fs.readFileSync(tokenPath));
        const credentials = JSON.parse(fs.readFileSync(credentialsPath));
        const key = credentials.installed || credentials.web;

        const oAuth2Client = new google.auth.OAuth2(
            key.client_id,
            key.client_secret,
            key.redirect_uris ? key.redirect_uris[0] : 'http://localhost:3000/oauth2callback'
        );
        oAuth2Client.setCredentials({ refresh_token: token.refresh_token });
        return oAuth2Client;
    }

    // Strategy 2: use env vars (for teammates who cloned without the JSON files)
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth2callback';
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (clientId && clientSecret && refreshToken) {
        const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
        oAuth2Client.setCredentials({ refresh_token: refreshToken });
        return oAuth2Client;
    }

    console.log(' Google Drive: no credentials found (JSON files or env vars). Using local storage.');
    return null;
}

async function uploadCVToGoogleDrive(file, candidateName) {
    console.log('Uploading CV to Google Drive for:', candidateName);

    try {
        const auth = await getOAuthClient();
        if (!auth) throw new Error('OAuth not configured');

        const drive = google.drive({ version: 'v3', auth });

        const fileName = `${candidateName.replace(/\s/g, '_')}_${Date.now()}.pdf`;
        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);

        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: 'application/pdf',
                parents: folderId ? [folderId] : []
            },
            media: { mimeType: 'application/pdf', body: bufferStream },
            fields: 'id, webViewLink'
        });

        const fileId = response.data.id;

        await drive.permissions.create({
            fileId,
            requestBody: { role: 'reader', type: 'anyone' }
        });

        const url = `https://drive.google.com/file/d/${fileId}/view`;
        console.log(`CV uploaded to Google Drive: ${fileName} (ID: ${fileId})`);
        return { fileId, url };

    } catch (error) {
        console.error(' Google Drive upload failed:', error.message);
        console.log(' Falling back to local storage');
        return saveCVToLocal(file, candidateName);
    }
}

async function saveCVToLocal(file, candidateName) {
    const uploadDir = path.join(__dirname, '../../uploads');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${candidateName.replace(/\s/g, '_')}_${Date.now()}.pdf`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);

    console.log(` CV saved locally: ${fileName}`);
    return { fileId: fileName, url: `/uploads/${fileName}` };
}

module.exports = { uploadCVToGoogleDrive };
