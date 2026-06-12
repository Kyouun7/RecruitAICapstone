const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const candidateRoutes = require('./src/routes/candidateRoutes');
const authRoutes = require('./src/routes/authRoutes');
const jobRoutes = require('./src/routes/jobRoutes');
const n8nRoutes = require('./src/routes/n8nRoutes');
const db = require('./src/db/connection');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS - izinkan semua origin yang valid
const allowedOrigins = [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3000',
    'https://recruitai-peach.vercel.app',
];

app.use(cors({
    origin: function (origin, callback) {
        // Izinkan request tanpa origin (misal: Postman, curl)
        if (!origin) return callback(null, true);
        // Izinkan semua subdomain trycloudflare.com dan vercel.app
        if (
            allowedOrigins.includes(origin) ||
            /\.trycloudflare\.com$/.test(origin) ||
            /\.vercel\.app$/.test(origin)
        ) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', candidateRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/n8n', n8nRoutes);
const dashboardRoutes = require('./src/routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

app.get('/health', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.json({ status: 'healthy', database: 'connected' });
    } catch (error) {
        res.status(500).json({ status: 'unhealthy', database: 'disconnected' });
    }
});

app.get('/', (req, res) => {
    res.json({ service: 'RecruitAi API', version: '1.0.0' });
});

app.listen(PORT, () => {
    console.log(`RecruitAi Server running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ success: false, message: 'CORS: origin tidak diizinkan' });
    }
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File maksimal 5MB' });
    }
    if (err.message === 'Hanya file PDF yang diperbolehkan') {
        return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
});