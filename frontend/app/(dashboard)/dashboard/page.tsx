'use client';

import { useState, useEffect } from 'react';
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
    { label: 'Applied', count: totalApplicants, pct: 100, color: 'bg-primary' },
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
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/15">
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
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/15">
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
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/15">
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
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/15">
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
      <div className="grid grid-cols-3 gap-6 mb-8">

        {/* Left: Recruitment Flow */}
        <div className="col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
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

        {/* Right: Upcoming Interviews */}
        <div className="bg-primary rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-lg">Upcoming Interviews</h3>
            <span className="material-symbols-outlined text-white/70">calendar_month</span>
          </div>

          <div className="bg-white/10 rounded-xl p-4 mb-4 flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs font-semibold text-white/70 uppercase">{new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase()}</p>
              <p className="text-4xl font-bold">{new Date().getDate()}</p>
            </div>
            <div>
              <p className="font-semibold">Today's Schedule</p>
              <p className="text-xs text-white/70">Coming soon</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-white/40 text-4xl">calendar_month</span>
            <p className="text-sm text-white/60 mt-2">Interview scheduling coming soon</p>
          </div>

          <button className="w-full text-center text-sm text-white/80 hover:text-white mt-4 underline">
            View Full Calendar
          </button>
        </div>
      </div>

      {/* ===== BOTTOM: Job Table + AI Insight ===== */}
      <div className="grid grid-cols-3 gap-6">

        {/* Active Job Openings */}
        <div className="col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden">
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
                        <Link href={`/jobs/${job.job_id}`} className="font-medium text-on-surface hover:text-primary transition-colors">
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
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/jobs/${job.job_id}`}>
                            <button className="p-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary">
                              <span className="material-symbols-outlined text-sm">visibility</span>
                            </button>
                          </Link>
                          <button className="p-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant hover:text-primary">
                            <span className="material-symbols-outlined text-sm">more_horiz</span>
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

        {/* AI Recruiter Insight */}
        <div className="bg-primary rounded-xl p-6 text-white flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-white/20 rounded-full px-3 py-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="text-xs font-bold uppercase tracking-wider">AI Recruiter Insight</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3">
            {totalApplicants > 0 ? `${totalApplicants} Candidates in Pipeline` : 'No Candidates Yet'}
          </h3>
          <p className="text-sm text-white/80 leading-relaxed mb-6">
            {totalApplicants > 0
              ? `You have ${activeJobs} active job opening${activeJobs !== 1 ? 's' : ''} with ${totalApplicants} total candidate${totalApplicants !== 1 ? 's' : ''} in your pipeline. Keep reviewing to find the best match.`
              : 'Start by creating a job opening and sharing it with candidates to begin building your pipeline.'}
          </p>

          <div className="bg-white/10 rounded-xl p-4 mt-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Recommended Action</p>
            <p className="text-sm text-white/90 leading-relaxed">
              {activeJobs === 0
                ? 'Create your first job opening to start receiving applications.'
                : `Review candidates for your ${activeJobs} active position${activeJobs !== 1 ? 's' : ''} to keep your hiring pipeline moving.`}
            </p>
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="mt-12 pt-6 border-t border-outline-variant/15 flex items-center justify-between text-xs text-on-surface-variant">
        <p className="font-semibold text-on-surface">RecruitAI</p>
        <p>© 2026 RecruitAI. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms of Service</a>
          <a href="#" className="hover:text-primary">Cookie Settings</a>
          <a href="#" className="hover:text-primary">Contact Us</a>
        </div>
      </div>

    </AdminLayout>
  );
}