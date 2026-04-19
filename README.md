# RecruitAI — Intelligent Applicant Triage System

Capstone project for Universitas Brawijaya — PT. Jalin Mayantara Indonesia.

An AI-powered recruitment platform that automatically screens and scores candidate CVs using a local LLM (Ollama), eliminating manual CV review for HR teams.

---

## How It Works

**For Candidates:**
1. Open the apply page → fill in personal details → upload CV (PDF)
2. System saves the application and triggers the AI pipeline automatically

**For HR / Admin:**
1. Login to the dashboard → manage job postings
2. View candidates with AI scores and accept/reject status
3. Scores are assigned automatically — no manual review needed

**AI Pipeline (runs in background via n8n):**
```
Candidate submits CV
    → Backend sends webhook to n8n
    → n8n downloads CV from Google Drive
    → Extracts text from PDF
    → Sends to Ollama (llama3.2) for scoring
    → Parses score (0-100) and status (accepted/rejected)
    → Updates candidate record in database
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Automation | n8n (Docker) |
| AI / LLM | Ollama (llama3.2 — runs locally, no API key needed) |
| Storage | Google Drive (fallback: local `uploads/` folder) |

---

## Pages & URLs

| URL | Who Uses It | Description |
|-----|-------------|-------------|
| `http://localhost:3001` | Everyone | Landing page |
| `http://localhost:3001/apply` | Candidates | Job application form |
| `http://localhost:3001/login` | HR | HR admin login |
| `http://localhost:3001/register` | HR | HR admin registration |
| `http://localhost:3001/dashboard` | HR | Candidate management dashboard |
| `http://localhost:3000` | Developers | Backend API root |
| `http://localhost:5678` | Developers | n8n workflow editor |

---

## Prerequisites

Install all of these before starting:

- [Node.js](https://nodejs.org) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop) — for n8n
- [Ollama](https://ollama.com/download) — for local AI scoring
- MySQL — via XAMPP, MySQL Workbench, or standalone installer
- Git

---

## Project Structure

```
RecruitAICapstone/
├── backend/                    # Express.js API — port 3000
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── routes/             # API route definitions
│   │   ├── services/           # Google Drive, webhook, email, DB
│   │   ├── middleware/         # Auth (JWT), file upload (Multer)
│   │   ├── db/
│   │   │   ├── schema.sql      # Database schema — run this first
│   │   │   └── connection.js   # MySQL connection pool
│   │   └── utils/
│   ├── auth.js                 # Google Drive OAuth setup (run once)
│   ├── .env.example            # Environment variable template
│   └── index.js                # App entry point
│
├── frontend/                   # Next.js app — port 3001
│   ├── app/                    # Pages (App Router)
│   ├── components/             # UI components
│   ├── lib/axios.ts            # HTTP client config
│   └── .env.local              # Frontend env vars (already configured)
│
└── n8n-docker/                 # n8n automation engine — port 5678
    ├── docker-compose.yml      # Docker config
    ├── n8n_data/               # n8n persistent data (gitignored)
    └── workflows/
        └── recruitai-cv-pipeline.json   # Import this into n8n
```

---

## Setup Guide

### Step 1 — Clone the Repository

```bash
git clone <repo-url>
cd RecruitAICapstone
```

---

### Step 2 — Setup Database (MySQL)

Make sure MySQL is running, then run the schema:

```bash
mysql -u root < backend/src/db/schema.sql
```

This creates the `recruitmen_db` database with these tables:

| Table | Description |
|-------|-------------|
| `users` | HR admin accounts (email, password, role) |
| `jobs` | Job postings (title, description, threshold score) |
| `candidates` | Applicant data, CV path, AI score, status |
| `password_resets` | Password reset tokens |

Pre-seeded jobs: Frontend Developer, Backend Developer, AI Engineer.

---

### Step 3 — Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your values:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=          # leave empty if no MySQL password
DB_NAME=recruitmen_db

# Auth
JWT_SECRET=recruitai-secret-key-2024
PORT=3000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3001

# n8n Integration
N8N_WEBHOOK_URL=http://localhost:5678/webhook/candidate
N8N_SECRET=recruitai-n8n-secret-2024

# Google Drive (optional — local storage works without this)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback
GOOGLE_REFRESH_TOKEN=
GOOGLE_DRIVE_FOLDER_ID=
```

Start the backend:

```bash
npm run dev
```

Verify:

```bash
curl http://localhost:3000/health
# Expected: {"status":"healthy","database":"connected"}
```

---

### Step 4 — Setup Frontend

```bash
cd frontend
npm install
npm run dev -- -p 3001
```

> The `-p 3001` flag is required — port 3000 is already used by the backend.

Frontend opens at: http://localhost:3001

The `.env.local` is already configured and does not need changes.

---

### Step 5 — Setup Ollama (Local AI)

1. Install from https://ollama.com/download and run the installer
2. Pull the model (~2GB download):

```bash
ollama pull llama3.2
```

3. Verify Ollama is running:

```bash
curl http://localhost:11434/api/tags
# Expected: list of installed models
```

Ollama runs as a background service after installation. No API key needed — it's fully local.

---

### Step 6 — Run n8n (Docker)

```bash
cd n8n-docker
docker compose up -d
```

n8n opens at: http://localhost:5678

On first run, create an owner account when prompted.

---

### Step 7 — Import the Workflow into n8n

1. Open http://localhost:5678
2. Click **Workflows** in the left sidebar
3. Click **Add workflow** → **Import from file**
4. Select: `n8n-docker/workflows/recruitai-cv-pipeline.json`
5. Click **Publish** (top-right) to activate

The workflow will listen for webhooks at:
`http://localhost:5678/webhook/candidate`

---

## API Endpoints

### Public (no auth required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/candidates` | Submit application (multipart/form-data with cv_file) |
| GET | `/api/jobs` | Get all active job listings |
| GET | `/api/jobs/:id` | Get job by ID |
| POST | `/api/auth/register` | Register HR account |
| POST | `/api/auth/login` | Login — returns JWT token |

### HR Dashboard (requires `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/me` | Get logged-in user info |
| POST | `/api/jobs` | Create new job posting |
| PUT | `/api/jobs/:id` | Update job |
| DELETE | `/api/jobs/:id` | Delete job |

### n8n Internal (called by n8n workflow only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/n8n/update-result` | Save AI score & status |
| GET | `/api/n8n/jobs/:job_id` | Get job details |

---

## Testing the Full Pipeline

**1. Insert a test candidate:**

```bash
mysql -u root -e "USE recruitmen_db; INSERT IGNORE INTO candidates (candidate_id, nama, email, telepon, posisi, job_id, status) VALUES ('CND-TEST-001', 'Budi Santoso', 'budi@test.com', '081234567890', 'AI Engineer', 'J-AI-001', 'pending');"
```

**2. Trigger the n8n workflow** (replace `YOUR_FILE_ID` with a real public Google Drive PDF file ID):

```bash
curl -X POST http://localhost:5678/webhook/candidate \
  -H "Content-Type: application/json" \
  -d '{
    "candidate_id": "CND-TEST-001",
    "candidate_name": "Budi Santoso",
    "email": "budi@test.com",
    "job_id": "J-AI-001",
    "job_title": "AI Engineer",
    "job_description": "LLM, Python, Machine Learning",
    "minimum_qualifications": "Python, TensorFlow, 2+ years ML experience",
    "threshold_score": 80,
    "cv_path": "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID",
    "division": "AI Engineer"
  }'
```

**3. Check the result:**

```bash
mysql -u root -e "USE recruitmen_db; SELECT candidate_id, nama, score, status FROM candidates;"
```

Expected: `score` filled in, `status` changed to `accepted` or `rejected`.

> Note: Google Drive file must be shared as "Anyone with the link can view" for n8n to download it.

---

## Google Services Setup

By default, CVs are saved locally in `backend/uploads/`. You can also use Google Drive for CV storage and Gmail for automated candidate emails.

### Google Drive Setup

To store CVs on Google Drive instead of local uploads:

**Option A — Using JSON files (local dev):**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → Enable **Google Drive API**
3. Create **OAuth 2.0 Desktop credentials** → Download as `client_secret.json`
4. Place `client_secret.json` in the `backend/` folder
5. Run the OAuth setup:
   ```bash
   cd backend
   node auth.js
   ```
6. Complete the browser login — this generates `token.json`

**Option B — Using environment variables (for team sharing):**

Add these to your `.env` (get values from your existing `client_secret.json` and `token.json`):

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token
GOOGLE_DRIVE_FOLDER_ID=your-folder-id
```

---

### Gmail Setup

The workflow can send automated acceptance/rejection emails through Gmail. If you skipped the Google Drive setup, just create or select any Google Cloud project for Gmail only. If you already completed the Google Drive setup above, you may already have a Google Cloud project and OAuth 2.0 Desktop client ready to reuse.

To enable Gmail notifications, open the same Google Cloud project and:

1. Enable the **Gmail API**
2. Reuse your existing **OAuth 2.0 Desktop credentials** if you already created them for Drive, or create a new desktop client if you skipped Drive or want separate credentials
3. Complete the OAuth authorization flow so n8n can access the Gmail account for sending mail

If your backend or n8n configuration uses environment variables for Gmail, add the required client ID, client secret, and refresh token values from the Google Cloud credentials you created or reused.

Notes:
- Use a dedicated Gmail account for automated notifications.
- Make sure the account has permission to send mail through the OAuth client you configure.
- If you rotate credentials, re-authorize the Gmail connection in n8n.

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `database disconnected` | MySQL not running or wrong `.env` credentials | Start MySQL, check `DB_USER` and `DB_PASSWORD` in `.env` |
| `Access denied for user ''@'localhost'` | `.env` file missing | Create `.env` from `.env.example` and restart backend |
| `The service refused the connection` (Ollama) | Ollama not running | Run `ollama serve` or restart Ollama app |
| `The service refused the connection` (Backend from n8n) | Backend not running | Run `npm run dev` in `/backend` |
| `CV text extraction failed` | CV is a scanned image PDF | Use a text-based PDF (not a photo scan) |
| Workflow not triggering | Workflow not activated | Open n8n → click **Publish** on the workflow |
| `404 webhook not registered` | Workflow inactive | Click **Publish** in n8n editor |
| Frontend shows CORS error | Backend missing `.env` or not restarted | Ensure `FRONTEND_URL=http://localhost:3001` in `.env`, restart backend |
