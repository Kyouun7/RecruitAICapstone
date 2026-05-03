'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import api from '@/lib/axios';

// ===== TYPES =====
interface Job {
  id: number;
  job_id: string;
  title: string;
  description: string;
  employment_type: string;
  location: string;
  work_setup: string;
  key_responsibilities: string;
  minimum_qualifications: string;
  threshold_score: number;
  is_active: number;
  created_at: string;
}

interface Candidate {
  id: number;
  candidate_id: string;
  nama: string;
  email: string;
  telepon: string;
  portofolio: string | null;
  posisi: string;
  job_id: string;
  cv_url: string | null;
  cv_google_drive_id: string | null;
  cv_original_name: string | null;
  score: number | null;
  status: 'pending' | 'processing' | 'processed' | 'accepted' | 'rejected';
  created_at: string;
  justifikasi: string | null;
  recruiter_note: string | null;
}

// ===== HELPERS =====
function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors = [
    'bg-blue-100 text-blue-700',
    'bg-emerald-100 text-emerald-700',
    'bg-violet-100 text-violet-700',
    'bg-amber-100 text-amber-700',
    'bg-rose-100 text-rose-700',
    'bg-cyan-100 text-cyan-700',
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null)
    return <span className="text-xs text-on-surface-variant italic">Pending</span>;
  const color =
    score >= 80 ? 'text-[#006c4d]' : score >= 60 ? 'text-amber-600' : 'text-error';
  return (
    <span className={`font-bold text-sm ${color}`}>
      {score}
      <span className="text-xs font-normal text-on-surface-variant">/100</span>
    </span>
  );
}

function StatusBadge({
  status,
  score,
  threshold,
}: {
  status: string;
  score: number | null;
  threshold: number;
}) {
  const isProcessed =
    status === 'accepted' || status === 'rejected' || status === 'processed';
  if (!isProcessed || score === null) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        Pending AI
      </span>
    );
  }
  if (score >= threshold) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f0fdf4] text-[#006c4d] border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-[#006c4d]" />
        Lolos Threshold
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-error-container text-on-error-container border border-red-200">
      <span className="w-1.5 h-1.5 rounded-full bg-error" />
      Gagal Threshold
    </span>
  );
}

// ===== DONUT CHART =====
function DonutChart({
  percentage,
  color,
}: {
  percentage: number;
  color: string;
}) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return (
    <svg width="90" height="90" viewBox="0 0 90 90">
      <circle cx="45" cy="45" r={radius} fill="none" stroke="#e1e3e4" strokeWidth="10" />
      <circle
        cx="45"
        cy="45"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 45 45)"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text x="45" y="50" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#191c1d">
        {percentage}%
      </text>
    </svg>
  );
}

// ===== CV DRAWER =====
function CVDrawer({
  candidate,
  threshold,
  onClose,
  onSendEmail,
}: {
  candidate: Candidate;
  threshold: number;
  onClose: () => void;
  onSendEmail: (candidate: Candidate) => void;
}) {
  const score = candidate.score;

  let cvUrl: string | null = null;
  if (candidate.cv_google_drive_id) {
    cvUrl = `https://drive.google.com/file/d/${candidate.cv_google_drive_id}/preview`;
  } else if (candidate.cv_url && candidate.cv_url.startsWith('http')) {
    cvUrl = candidate.cv_url;
  } else if (candidate.cv_url) {
    cvUrl = `${process.env.NEXT_PUBLIC_API_URL}${candidate.cv_url}`;
  }

  const matchLabel =
    score === null
      ? 'Pending'
      : score >= 85
      ? 'High Match'
      : score >= 70
      ? 'Good Match'
      : score! >= threshold
      ? 'Passed'
      : 'Low Match';

  const matchColor =
    score === null
      ? 'bg-amber-100 text-amber-700'
      : score >= 85
      ? 'bg-[#003366] text-white'
      : score! >= threshold
      ? 'bg-[#006c4d] text-white'
      : 'bg-error-container text-on-error-container';

  const scoreColor =
    score === null
      ? '#737780'
      : score >= 80
      ? '#006c4d'
      : score >= 60
      ? '#d97706'
      : '#ba1a1a';

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 flex h-full w-full max-w-[900px] bg-background shadow-2xl">
        {/* Left: CV Preview */}
        <div className="flex-1 flex flex-col bg-surface-container-low border-r border-outline-variant/20">
          <div className="flex items-center justify-between px-5 py-3 bg-surface-container-lowest border-b border-outline-variant/20">
            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-[18px]">description</span>
              <span className="truncate max-w-[220px] font-medium">
                {candidate.cv_original_name || 'CV Document'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {cvUrl && (
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                  title="Buka di tab baru"
                >
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-error-container text-on-surface-variant hover:text-error transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            {cvUrl ? (
              <iframe
                src={cvUrl}
                className="w-full h-full"
                title="CV Preview"
                allow="autoplay"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-on-surface-variant">
                <span className="material-symbols-outlined text-6xl opacity-20">description</span>
                <p className="text-sm">CV tidak tersedia atau belum diupload</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Info Panel */}
        <div className="w-[290px] flex flex-col bg-surface-container-lowest overflow-y-auto">
          {/* Candidate Header */}
          <div className="px-5 pt-5 pb-4 border-b border-outline-variant/15">
            <p className="text-lg font-bold text-on-surface leading-tight">{candidate.nama}</p>
            <p className="text-sm text-on-surface-variant">{candidate.posisi}</p>
          </div>

          {/* AI Score */}
          <div className="px-5 py-4 border-b border-outline-variant/15">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              AI Match Score
            </p>
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-4xl font-black"
                style={{ color: scoreColor }}
              >
                {score !== null ? `${score}%` : '—'}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${matchColor}`}
              >
                {matchLabel}
              </span>
            </div>
            <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${score ?? 0}%`,
                  backgroundColor: scoreColor,
                }}
              />
            </div>
          </div>

          {/* AI Analysis */}
          <div className="px-5 py-4 border-b border-outline-variant/15">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              AI Analysis
            </p>
            {candidate.justifikasi ? (
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {candidate.justifikasi}
              </p>
            ) : (
              <div className="space-y-1.5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-2 bg-surface-container-high rounded"
                    style={{ width: `${85 - i * 12}%` }}
                  />
                ))}
                <p className="text-[10px] text-outline italic mt-1">
                  {score === null ? 'Menunggu proses AI...' : 'Tidak ada analisis tersedia'}
                </p>
              </div>
            )}
          </div>

          {/* Registration Details */}
          <div className="px-5 py-4 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">
              Registration Details
            </p>
            <div className="space-y-3.5">
              <div>
                <p className="text-[10px] text-outline uppercase tracking-wider mb-0.5">Full Name</p>
                <p className="text-sm font-semibold text-on-surface">{candidate.nama}</p>
              </div>
              <div>
                <p className="text-[10px] text-outline uppercase tracking-wider mb-0.5">Email Address</p>
                <p className="text-sm font-semibold text-on-surface break-all">{candidate.email}</p>
              </div>
              <div>
                <p className="text-[10px] text-outline uppercase tracking-wider mb-0.5">Phone Number</p>
                <p className="text-sm font-semibold text-on-surface">{candidate.telepon}</p>
              </div>
              {candidate.portofolio && (
                <div>
                  <p className="text-[10px] text-outline uppercase tracking-wider mb-0.5">Portfolio</p>
                  <a
                    href={candidate.portofolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary hover:underline break-all"
                  >
                    {candidate.portofolio}
                  </a>
                </div>
              )}
              <div>
                <p className="text-[10px] text-outline uppercase tracking-wider mb-0.5">Apply Date</p>
                <p className="text-sm font-semibold text-on-surface">{formatDate(candidate.created_at)}</p>
              </div>
              <div>
                <p className="text-[10px] text-outline uppercase tracking-wider mb-1">Status</p>
                <StatusBadge status={candidate.status} score={candidate.score} threshold={threshold} />
              </div>
            </div>
          </div>

          {/* Send Email */}
          <div className="px-5 py-4 border-t border-outline-variant/15">
            <button
              onClick={() => onSendEmail(candidate)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#001e40] to-[#003366] text-white py-3 rounded-xl font-semibold text-sm shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== MAIN PAGE =====
export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'lolos' | 'gagal' | 'pending'>('all');
  const [sortBy, setSortBy] = useState<'score' | 'date'>('score');
  const [emailSent, setEmailSent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${apiUrl}/api/jobs/${jobId}`);
        const data = await res.json();
        if (data.success) setJob(data.data);
      } catch (err) {
        console.error('fetchJob error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    if (jobId) fetchJob();
  }, [jobId]);

  const fetchCandidates = useCallback(async () => {
    if (!job) return;
    try {
      const res = await api.get(`/api/candidates?job_id=${job.job_id}`);
      if (res.data.success) {
        setCandidates(res.data.data);
      }
    } catch {
      try {
        const res = await api.get(`/api/jobs/${job.job_id}/candidates`);
        if (res.data.success) setCandidates(res.data.data);
      } catch {
        setCandidates([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [job]);

  useEffect(() => {
    if (job) fetchCandidates();
  }, [job, fetchCandidates]);

  const threshold = job?.threshold_score ?? 70;

  const processedCandidates = candidates.filter((c) => c.score !== null);
  const lolosCandidates = processedCandidates.filter((c) => c.score! >= threshold);
  const gagalCandidates = processedCandidates.filter((c) => c.score! < threshold);
  const lolosPercent =
    processedCandidates.length > 0
      ? Math.round((lolosCandidates.length / processedCandidates.length) * 100)
      : 0;

  const topCandidates = [...processedCandidates]
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 3);

  const filteredCandidates = candidates
    .filter((c) => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'pending') return c.score === null;
      if (filterStatus === 'lolos') return c.score !== null && c.score >= threshold;
      if (filterStatus === 'gagal') return c.score !== null && c.score < threshold;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return (b.score ?? -1) - (a.score ?? -1);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const handleSendEmail = (candidate: Candidate) => {
    const subject = encodeURIComponent(`Hasil Seleksi - ${candidate.posisi}`);
    const body = encodeURIComponent(
      `Yth. ${candidate.nama},\n\nTerima kasih telah melamar posisi ${candidate.posisi}.\n\nHasil AI Score Anda: ${candidate.score ?? 'Pending'}/100\nStatus: ${candidate.score !== null && candidate.score >= threshold ? 'Lolos' : 'Belum Lolos'} Threshold\n\nHormat kami,\nRecruitAI Team`
    );
    window.open(`mailto:${candidate.email}?subject=${subject}&body=${body}`);
    setEmailSent(candidate.candidate_id);
    setTimeout(() => setEmailSent(null), 3000);
  };

  if (!job && !isLoading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="material-symbols-outlined text-6xl text-error mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
            error
          </span>
          <h2 className="text-2xl font-bold text-on-surface mb-2">Lowongan tidak ditemukan</h2>
          <button onClick={() => router.push('/dashboard')} className="mt-4 text-primary hover:underline text-sm font-medium">
            ← Kembali ke Dashboard
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      {/* JOB HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          {job ? (
            <>
              <h2 className="text-3xl font-headline font-bold text-on-surface mb-1">{job.title}</h2>
              <div className="flex items-center flex-wrap gap-3 text-sm text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">work</span>
                  {job.employment_type}
                </span>
                <span className="text-outline-variant">•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  {job.location || 'Remote'}
                </span>
                <span className="text-outline-variant">•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">laptop_mac</span>
                  {job.work_setup}
                </span>
                <span className={`ml-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${job.is_active ? 'bg-[#f0fdf4] text-[#006c4d]' : 'bg-error-container text-on-error-container'}`}>
                  {job.is_active ? '● Open' : 'Closed'}
                </span>
              </div>
            </>
          ) : (
            <div className="space-y-1">
              <h2 className="text-3xl font-headline font-bold text-on-surface mb-1">Memuat...</h2>
              <p className="text-sm text-on-surface-variant">Mengambil data lowongan</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/dashboard')} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Kembali
          </button>
          <a href={`/jobs/${jobId}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            Lihat Posting
          </a>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-3 gap-5 mb-8">

        {/* Total Pendaftar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Total Pendaftar</p>
          {isLoading ? (
            <div className="h-10 bg-surface-container-high rounded animate-pulse w-20" />
          ) : (
            <>
              <p className="text-4xl font-black text-on-surface">
                {candidates.length.toLocaleString('id-ID')}
              </p>
              {candidates.length > 0 && (
                <p className="text-xs text-[#006c4d] mt-1.5 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  {processedCandidates.length} sudah diproses AI
                </p>
              )}
            </>
          )}
        </div>

        {/* AI Threshold */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">AI Threshold Score</p>
          <p className="text-4xl font-black text-primary">{threshold}</p>
          <p className="text-xs text-on-surface-variant mt-1.5">Minimum score untuk lolos</p>
        </div>

        {/* Donut */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">
            Kandidat Lolos Threshold
          </p>
          {isLoading ? (
            <div className="flex items-center gap-4">
              <div className="w-[90px] h-[90px] rounded-full bg-surface-container-high animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-surface-container-high rounded animate-pulse" />
                <div className="h-3 bg-surface-container-high rounded animate-pulse w-3/4" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <DonutChart percentage={lolosPercent} color="#003366" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-on-surface-variant">Lolos</p>
                    <p className="text-sm font-bold text-on-surface">
                      {lolosCandidates.length}
                      <span className="text-xs font-normal text-on-surface-variant ml-1">{lolosPercent}%</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-outline-variant flex-shrink-0" />
                  <div>
                    <p className="text-xs text-on-surface-variant">Tidak Lolos</p>
                    <p className="text-sm font-bold text-on-surface">
                      {gagalCandidates.length}
                      <span className="text-xs font-normal text-on-surface-variant ml-1">{100 - lolosPercent}%</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TOP LEADERBOARD */}
      {!isLoading && topCandidates.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-on-surface mb-4 font-headline">
            Top Candidates Leaderboard
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {topCandidates.map((c, idx) => {
              const medals = ['🥇', '🥈', '🥉'];
              const scoreColor =
                c.score! >= 80 ? '#006c4d' : c.score! >= 60 ? '#d97706' : '#ba1a1a';
              return (
                <button
                  key={c.candidate_id}
                  onClick={() => setSelectedCandidate(c)}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-left hover:border-primary/40 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${getAvatarColor(c.nama)}`}
                    >
                      {getInitials(c.nama)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-on-surface text-sm leading-tight truncate group-hover:text-primary transition-colors">
                        {c.nama}
                      </p>
                      <p className="text-xs text-on-surface-variant truncate">{c.posisi}</p>
                    </div>
                    <span className="text-xl flex-shrink-0">{medals[idx]}</span>
                  </div>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-3xl font-black" style={{ color: scoreColor }}>
                      {c.score}
                    </span>
                    <span className="text-xs text-on-surface-variant mb-1">/100 AI Score</span>
                  </div>
                  <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${c.score}%`, backgroundColor: scoreColor }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* PIPELINE TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-on-surface font-headline">Applicant Pipeline</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                className="appearance-none pl-8 pr-4 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg text-on-surface-variant focus:outline-none cursor-pointer hover:border-primary/30 transition-colors"
              >
                <option value="all">Semua Status</option>
                <option value="lolos">Lolos Threshold</option>
                <option value="gagal">Gagal Threshold</option>
                <option value="pending">Pending AI</option>
              </select>
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                filter_list
              </span>
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="appearance-none pl-8 pr-4 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg text-on-surface-variant focus:outline-none cursor-pointer hover:border-primary/30 transition-colors"
              >
                <option value="score">Sort: Score</option>
                <option value="date">Sort: Tanggal</option>
              </select>
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                swap_vert
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-3 font-semibold">Nama Kandidat</th>
                <th className="px-6 py-3 font-semibold">Score AI</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Tanggal Apply</th>
                <th className="px-6 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(5)].map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-surface-container-high rounded animate-pulse" style={{ width: j === 0 ? '80%' : '60%' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-14 text-center">
                    <span className="material-symbols-outlined text-5xl text-outline-variant block mb-3" style={{ fontVariationSettings: "'FILL' 0" }}>
                      group_off
                    </span>
                    <p className="text-on-surface-variant font-medium">Belum ada kandidat</p>
                    <p className="text-xs text-outline mt-1">
                      {filterStatus !== 'all'
                        ? 'Tidak ada kandidat dengan filter ini'
                        : 'Bagikan link lowongan untuk mulai menerima lamaran'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((candidate) => (
                  <tr
                    key={candidate.candidate_id}
                    className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${getAvatarColor(candidate.nama)}`}
                        >
                          {getInitials(candidate.nama)}
                        </div>
                        <div>
                          <p className="font-semibold text-on-surface group-hover:text-primary transition-colors leading-tight">
                            {candidate.nama}
                          </p>
                          <p className="text-xs text-on-surface-variant">{candidate.posisi}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <ScoreBadge score={candidate.score} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge
                        status={candidate.status}
                        score={candidate.score}
                        threshold={threshold}
                      />
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      {formatDate(candidate.created_at)}
                    </td>
                    <td
                      className="px-6 py-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSelectedCandidate(candidate)}
                          className="p-1.5 rounded-lg hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors"
                          title="Lihat CV"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button
                          onClick={() => handleSendEmail(candidate)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            emailSent === candidate.candidate_id
                              ? 'text-[#006c4d] bg-[#f0fdf4]'
                              : 'hover:bg-primary/10 text-on-surface-variant hover:text-primary'
                          }`}
                          title="Kirim Email"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {emailSent === candidate.candidate_id ? 'mark_email_read' : 'mail'}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredCandidates.length > 0 && (
          <div className="px-6 py-3 border-t border-outline-variant/10 flex items-center justify-between bg-gray-50 text-xs text-gray-500">
            <span>
              Menampilkan <strong className="text-on-surface">{filteredCandidates.length}</strong> dari{' '}
              <strong className="text-on-surface">{candidates.length}</strong> kandidat
            </span>
            <span>
              AI Threshold:{' '}
              <strong className="text-primary">{threshold}</strong> / 100
            </span>
          </div>
        )}
      </div>

      {/* CV DRAWER */}
      {selectedCandidate && (
        <CVDrawer
          candidate={selectedCandidate}
          threshold={threshold}
          onClose={() => setSelectedCandidate(null)}
          onSendEmail={handleSendEmail}
        />
      )}

    </AdminLayout>
  );
}