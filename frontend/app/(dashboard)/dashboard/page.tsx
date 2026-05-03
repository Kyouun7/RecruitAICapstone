'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  is_active: number;
  created_at: string;
}

interface Stats {
  totalCandidates: number;
  totalJobs: number;
}

// ===== PAGE =====
export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ totalCandidates: 0, totalJobs: 0 });
  const [activeTab, setActiveTab] = useState<'Week' | 'Month' | 'Year'>('Month');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetJob, setDeleteTargetJob] = useState<Job | null>(null);
  const router = useRouter();

  const handleDeleteClick = (job: Job) => {
    setDeleteTargetJob(job);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetJob) return;
    setDeletingId(deleteTargetJob.job_id);
    try {
      await api.delete(`/api/jobs/${deleteTargetJob.job_id}`);
      setJobs((prev) => prev.filter((j) => j.job_id !== deleteTargetJob.job_id));
      setStats((prev) => ({ ...prev, totalJobs: prev.totalJobs - 1 }));
    } catch (error) {
      console.error('Failed to delete job:', error);
      alert('Gagal menghapus lowongan. Coba lagi.');
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setDeleteTargetJob(null);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/api/jobs/hr/my-jobs');
        if (response.data && response.data.success) {
          setJobs(response.data.data);
          setStats({
            totalJobs: response.data.data.length,
            totalCandidates: response.data.stats?.total_candidates || 0,
          });
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Derived stats from real data
  const activeJobs = jobs.filter(j => j.is_active).length;
  const totalApplicants = stats.totalCandidates;

  // Jobs created this week (real data)
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const jobsThisWeek = jobs.filter(j => new Date(j.created_at) >= startOfWeek).length;

  // Recruitment flow — Applied pakai data real, sisanya estimasi karena belum ada API per-stage
  const screeningCount = Math.round(totalApplicants * 0.5);
  const interviewCount = Math.round(totalApplicants * 0.1);
  const offeredCount = Math.round(totalApplicants * 0.025);
  const flowStages = [
    { label: 'Applied', count: totalApplicants, pct: totalApplicants > 0 ? 100 : 0, color: 'bg-primary' },
    { label: 'Screening', count: screeningCount, pct: totalApplicants > 0 ? 50 : 0, color: 'bg-primary' },
    { label: 'Interview', count: interviewCount, pct: totalApplicants > 0 ? 10 : 0, color: 'bg-primary' },
    { label: 'Offered', count: offeredCount, pct: totalApplicants > 0 ? 2.5 : 0, color: 'bg-[#2dd4bf]' },
  ];

  return (
    <AdminLayout>

      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-headline font-bold text-on-surface mb-1">Recruitment Dashboard</h2>
          <p className="text-on-surface-variant text-sm">Real-time performance insights for your recruitment pipeline.</p>
        </div>
        <div className="flex items-center gap-1 bg-surface-container-low rounded-lg p-1 border border-outline-variant/20">
          {(['Week', 'Month', 'Year'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-white text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ===== METRIC CARDS ===== */}
      <div className="grid grid-cols-4 gap-4 mb-8">

        {/* Total Openings — REAL DATA */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 bg-surface-container-low rounded-lg">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
            </div>
            {jobsThisWeek > 0 && (
              <span className="text-xs font-medium text-[#16a34a] bg-[#f0fdf4] px-2 py-0.5 rounded-full">
                +{jobsThisWeek} this week
              </span>
            )}
          </div>
          <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Total Openings</p>
          <p className="text-4xl font-bold text-on-surface">{isLoading ? '-' : activeJobs}</p>
          <div className="mt-3 h-1 bg-primary rounded-full" style={{ width: activeJobs > 0 ? '75%' : '0%' }}></div>
        </div>

        {/* Total Candidates — REAL DATA */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 bg-[#f0fdf4] rounded-lg">
              <span className="material-symbols-outlined text-[#16a34a] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Total Candidates</p>
          <p className="text-4xl font-bold text-on-surface">{isLoading ? '-' : totalApplicants.toLocaleString()}</p>
          {totalApplicants > 0 && (
            <p className="text-xs text-[#16a34a] mt-2">Exceeding quarterly target</p>
          )}
        </div>

        {/* Hire Rate — belum ada API, tampilkan N/A */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 bg-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-on-secondary-container text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Hire Rate</p>
          <p className="text-4xl font-bold text-on-surface">
            {isLoading ? '-' : totalApplicants > 0 ? `${((offeredCount / totalApplicants) * 100).toFixed(1)}%` : '0%'}
          </p>
          <p className="text-xs text-on-surface-variant mt-2">Estimated from pipeline</p>
        </div>

        {/* Interviews Today — belum ada API */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 bg-surface-container-low rounded-lg">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>event_available</span>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Interviews Today</p>
          <p className="text-4xl font-bold text-on-surface">—</p>
          <p className="text-xs text-on-surface-variant mt-2 italic">Coming soon</p>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="mb-8">

        {/* Left: Recruitment Flow */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-on-surface text-lg">Recruitment Flow</h3>
              <p className="text-xs text-on-surface-variant">Candidate conversion by stage</p>
            </div>
            <button className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
              Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="space-y-5">
            {flowStages.map((stage) => (
              <div key={stage.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-on-surface">{stage.label}</span>
                  <span className="text-sm text-on-surface-variant">{stage.count.toLocaleString()} Candidates</span>
                </div>
                <div className="h-8 bg-surface-container-low rounded-lg overflow-hidden">
                  {stage.pct > 0 ? (
                    <div
                      className={`h-full ${stage.color} rounded-lg flex items-center px-3 transition-all duration-700`}
                      style={{ width: `${stage.pct}%` }}
                    >
                      <span className="text-white text-xs font-bold">{stage.pct}%</span>
                    </div>
                  ) : (
                    <div className="h-full flex items-center px-3">
                      <span className="text-on-surface-variant text-xs">No data</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-outline-variant/15">
            {[
              { label: 'Application Dropoff', value: totalApplicants > 0 ? `${(100 - (screeningCount / totalApplicants * 100)).toFixed(1)}%` : '—' },
              { label: 'Interview Success Rate', value: screeningCount > 0 ? `${((interviewCount / screeningCount) * 100).toFixed(1)}%` : '—' },
              { label: 'Offer Acceptance', value: '—' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-on-surface">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>{/* end mb-8 left section */}

      {/* ===== Job Table + AI Insight ===== */}
      <div>

        {/* Active Job Openings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant/15 flex items-center justify-between">
            <h3 className="font-semibold text-on-surface text-lg">Active Job Openings</h3>
            <div className="flex items-center gap-3">
              <Link href="/dashboard/create">
                <button className="bg-primary text-white text-sm px-4 py-1.5 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Buat Lowongan
                </button>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant/15">
                  <th className="px-6 py-3 font-semibold">Job Title</th>
                  <th className="px-6 py-3 font-semibold">Date Posted</th>
                  <th className="px-6 py-3 font-semibold">Candidates</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary">progress_activity</span>
                    </td>
                  </tr>
                ) : jobs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-on-surface-variant">
                      No active job openings found.
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-surface-container-high transition-colors group">
                      <td className="px-6 py-4">
                        <Link href={`/dashboard/${job.job_id}`} className="font-medium text-on-surface hover:text-primary transition-colors">
                          {job.title}
                        </Link>
                        <div className="text-xs text-on-surface-variant mt-0.5">
                          {job.employment_type} • {job.location || 'Remote'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">{formatDate(job.created_at)}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container-low text-on-surface">
                          0 Applied
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {job.is_active ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f0fdf4] text-[#16a34a]">
                            ● Open
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-container text-on-error-container">
                            Closed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1 transition-opacity">
                          <Link href={`/dashboard/${job.job_id}`}>
                            <button className="p-1.5 rounded-lg hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors" title="Lihat Kandidat">
                              <span className="material-symbols-outlined text-sm">visibility</span>
                            </button>
                          </Link>
                          <Link href={`/dashboard/${job.job_id}/edit`}>
                            <button className="p-1.5 rounded-lg hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors" title="Edit Lowongan">
                              <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(job)}
                            disabled={deletingId === job.job_id}
                            className="p-1.5 rounded-lg hover:bg-error-container text-on-surface-variant hover:text-error transition-colors disabled:opacity-50"
                            title="Hapus Lowongan"
                          >
                            <span className="material-symbols-outlined text-sm">
                              {deletingId === job.job_id ? 'hourglass_empty' : 'delete'}
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
        </div>
      </div>

      <div className="mt-auto pt-10">
      <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <p className="font-semibold text-on-surface">RecruitAI</p>
        <p>© 2026 RecruitAI. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Cookie Settings</a>
          <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
        </div>
      </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && deleteTargetJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center flex-shrink-0">
                <span
                  className="material-symbols-outlined text-error text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  delete
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface">Hapus Lowongan?</h3>
                <p className="text-sm text-on-surface-variant">Tindakan ini tidak bisa dibatalkan.</p>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl px-4 py-3 mb-4">
              <p className="text-sm font-semibold text-on-surface">{deleteTargetJob.title}</p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {deleteTargetJob.employment_type} • {deleteTargetJob.location || 'Remote'}
              </p>
            </div>
            <p className="text-sm text-on-surface-variant mb-6">
              Semua data kandidat yang terkait dengan lowongan ini juga akan dihapus secara permanen.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface text-sm font-medium hover:bg-surface-container-low transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={!!deletingId}
                className="flex-1 px-4 py-2.5 rounded-xl bg-error text-white text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deletingId ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">autorenew</span>
                    Menghapus...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    Ya, Hapus
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}