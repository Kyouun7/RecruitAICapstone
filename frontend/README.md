# 🤖 RecruitAI — Intelligent Applicant Triage System

> **Capstone Project — Universitas Brawijaya, Fakultas Ilmu Komputer 2026**  
> Sistem seleksi pelamar berbasis AI untuk mempercepat *time-to-hire* dan efisiensi screening resume.

---

## 📌 Tentang Proyek

**RecruitAI** adalah sistem rekrutmen cerdas yang membantu tim HR melakukan screening CV secara otomatis menggunakan teknologi *Large Language Model (LLM)*. Sistem ini dirancang untuk mitra kami, **PT. Jalin Mayantara Indonesia**, sebagai bagian dari platform **Jalin AI Services**.

Dengan RecruitAI, proses screening yang biasanya memakan waktu berjam-jam dapat diselesaikan dalam hitungan detik — setiap CV dievaluasi secara semantik dan menghasilkan skor kesesuaian (0–100) beserta justifikasi singkat dari AI.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 📝 **Form Pendaftaran** | Job Seeker mengisi data diri & upload CV (PDF) |
| 🤖 **AI Scoring** | LLM mengevaluasi CV dan menghasilkan skor 0–100 |
| 📊 **HR Dashboard** | Rekruter memantau kandidat secara real-time |
| 🏆 **Leaderboard** | Ranking kandidat berdasarkan skor tertinggi |
| 📧 **Auto Email** | Notifikasi otomatis ke kandidat yang lolos threshold |
| ⚙️ **Konfigurasi HR** | HR mengatur job description & passing grade |

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=flat-square)
![Recharts](https://img.shields.io/badge/Recharts-2.x-22B5BF?style=flat-square)

### Backend
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql)
![n8n](https://img.shields.io/badge/n8n-Workflow-EA4B71?style=flat-square)

### AI Layer
![LLM](https://img.shields.io/badge/Jalin_AI_Services-LLM-8B1A2B?style=flat-square)
![Google Drive](https://img.shields.io/badge/Google_Drive-API-4285F4?style=flat-square&logo=google-drive)
![Gmail](https://img.shields.io/badge/Gmail-API-EA4335?style=flat-square&logo=gmail)

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT LAYER                      │
│         Next.js Dashboard + Form Pendaftaran         │
└──────────────────────┬──────────────────────────────┘
                       │ REST API
┌──────────────────────▼──────────────────────────────┐
│                  APPLICATION LAYER                   │
│    n8n Workflow Engine  ←→  Jalin AI Services (LLM) │
│              ↓                                       │
│           Gmail API (Auto Notification)              │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                   DATABASE LAYER                     │
│         MySQL (kandidat, lowongan, hasil)            │
│              Google Drive (CV Storage)               │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Alur Proses Sistem

```
1️⃣  KONFIGURASI  →  HR mengatur job description & threshold score
2️⃣  INPUT        →  Kandidat upload CV (PDF) via form pendaftaran
3️⃣  PROCESS      →  n8n ekstrak teks → kirim ke LLM → skor + justifikasi
4️⃣  STORAGE      →  Simpan hasil ke MySQL + kirim email otomatis
5️⃣  OUTPUT       →  HR pantau dashboard real-time (leaderboard, chart, filter)
```

---

## 📁 Struktur Folder

```
recruitai-fe/
├── app/
│   ├── page.tsx              # Landing page / list lowongan
│   ├── apply/
│   │   └── page.tsx          # Form pendaftaran kandidat
│   ├── login/
│   │   └── page.tsx          # Login HR
│   ├── dashboard/
│   │   ├── page.tsx          # Dashboard utama HR
│   │   └── [id]/
│   │       └── page.tsx      # Detail kandidat per lowongan
│   └── create/
│       └── page.tsx          # Buat lowongan baru
├── components/               # Komponen reusable
├── public/                   # Static assets
├── package.json
└── README.md
```

---

## ⚙️ Cara Menjalankan

### Prerequisites
- Node.js 18+
- npm / yarn

### Instalasi

```bash
# Clone repository
git clone https://github.com/Niconve/RecruitAICapstone.git
cd RecruitAICapstone

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Environment Variables

Buat file `.env.local` di root folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 👥 Tim Big Hero 6

| Nama | NIM | Prodi | Peran |
|------|-----|-------|-------|
| A. Agung Ngurah Bayu Widia Putra | 235150207111066 | TIF | AI Engineer |
| Made Deva Wikananda Putra | 235150207111061 | TIF | AI Engineer |
| Muhammad Abyan Syauqi | 235150201111022 | TIF | Frontend Developer |
| Muhammad Alden Prabaswara | 235150201111014 | TIF | Frontend Developer |
| Rheza Agung Luckianto | 235150407111028 | SI | Project Manager |
| Tantry Purba | 235150707111025 | TI | Backend Developer |

---

## 🎯 Mitra Proyek

**PT. Jalin Mayantara Indonesia**  
Perusahaan IT & TIK yang berdiri sejak 2006, bergerak di bidang SaaS, Cloud Computing, dan AI Services untuk pendidikan Indonesia.

🌐 [jayantara.co.id](https://www.jayantara.co.id)

---

## 📄 Dokumentasi

| Dokumen | Status |
|---------|--------|
| LK1 — Proposal Proyek | ✅ Selesai |
| LK2 — Analisis Kebutuhan & Desain Solusi | ✅ Selesai |
| LK3 — Implementasi | 🔄 In Progress |
| LK4 — Pengujian & Evaluasi | ⏳ Belum dimulai |

---

## 📜 Lisensi

Proyek ini dibuat untuk keperluan **Capstone Project** Universitas Brawijaya.  
© 2026 Tim Big Hero 6 — Fakultas Ilmu Komputer, Universitas Brawijaya.
