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
  candidate_count?: number;
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
  const [activeTab, setActiveTab] = useState<'Minggu' | 'Bulan' | 'Tahun'>('Bulan');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetJob, setDeleteTargetJob] = useState<Job | null>(null);
  const router = useRouter();

  const handleDeleteClick = (e: React.MouseEvent, job: Job) => {
    e.stopPropagation();
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
          const jobsData: Job[] = response.data.data;

          // Fetch candidate count per job
          const jobsWithCandidates = await Promise.all(
            jobsData.map(async (job) => {
              try {
                const candRes = await api.get(`/api/candidates?job_id=${job.job_id}`);
                const count = candRes.data?.pagination?.total ?? candRes.data?.data?.length ?? 0;
                return { ...job, candidate_count: count };
              } catch {
                return { ...job, candidate_count: 0 };
              }
            })
          );

          setJobs(jobsWithCandidates);

          const totalCands = jobsWithCandidates.reduce(
            (sum, j) => sum + (j.candidate_count || 0),
            0
          );
          setStats({
            totalJobs: jobsWithCandidates.length,
            totalCandidates: response.data.stats?.total_candidates || totalCands,
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
    return date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' });
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

  return (
    <AdminLayout>

      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-headline font-bold text-on-surface mb-1">Dasbor Rekrutmen</h2>
          <p className="text-on-surface-variant text-sm">Pantau performa rekrutmen Anda secara real-time.</p>
        </div>
        <div className="flex items-center gap-1 bg-surface-container-low rounded-lg p-1 border border-outline-variant/20">
          {(['Minggu', 'Bulan', 'Tahun'] as const).map(tab => (
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

      {/* ===== METRIC CARDS — hanya 2 card ===== */}
      <div className="grid grid-cols-2 gap-4 mb-8">

        {/* Total Lowongan — REAL DATA */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 bg-surface-container-low rounded-lg">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
            </div>
            {jobsThisWeek > 0 && (
              <span className="text-xs font-medium text-[#16a34a] bg-[#f0fdf4] px-2 py-0.5 rounded-full">
                +{jobsThisWeek} minggu ini
              </span>
            )}
          </div>
          <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Total Lowongan</p>
          <p className="text-4xl font-bold text-on-surface">{isLoading ? '-' : activeJobs}</p>
          <div className="mt-3 h-1 bg-primary rounded-full" style={{ width: activeJobs > 0 ? '75%' : '0%' }}></div>
        </div>

        {/* Total Pendaftar — jumlah kandidat yang mendaftar */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 bg-[#f0fdf4] rounded-lg">
              <span className="material-symbols-outlined text-[#16a34a] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Total Pendaftar</p>
          <p className="text-4xl font-bold text-on-surface">{isLoading ? '-' : totalApplicants.toLocaleString()}</p>
          {totalApplicants > 0 && (
            <p className="text-xs text-[#16a34a] mt-2">Total kandidat yang telah mendaftar</p>
          )}
        </div>
      </div>

      {/* ===== Job Table ===== */}
      <div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant/15 flex items-center justify-between">
            <h3 className="font-semibold text-on-surface text-lg">Lowongan Aktif</h3>
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
                  <th className="px-6 py-3 font-semibold">Judul Posisi</th>
                  <th className="px-6 py-3 font-semibold">Tanggal Posting</th>
                  <th className="px-6 py-3 font-semibold">Pendaftar</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Aksi</th>
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
                      Belum ada lowongan aktif.
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr
                      key={job.id}
                      onClick={() => router.push(`/dashboard/${job.job_id}`)}
                      className="hover:bg-surface-container-high transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-on-surface group-hover:text-primary transition-colors">
                          {job.title}
                        </span>
                        <div className="text-xs text-on-surface-variant mt-0.5">
                          {job.employment_type} • {job.location || 'Remote'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">{formatDate(job.created_at)}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container-low text-on-surface">
                          {job.candidate_count ?? 0} Pendaftar
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {job.is_active ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f0fdf4] text-[#16a34a]">
                            ● Buka
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-container text-on-error-container">
                            Tutup
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div
                          className="flex justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Edit */}
                          <Link href={`/dashboard/${job.job_id}/edit`}>
                            <button
                              className="p-1.5 rounded-lg hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors"
                              title="Edit Lowongan"
                            >
                              <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                          </Link>
                          {/* Delete */}
                          <button
                            onClick={(e) => handleDeleteClick(e, job)}
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
          <p>© 2026 RecruitAI. Hak cipta dilindungi.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-primary transition-colors">Pengaturan Cookie</a>
            <a href="#" className="hover:text-primary transition-colors">Hubungi Kami</a>
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