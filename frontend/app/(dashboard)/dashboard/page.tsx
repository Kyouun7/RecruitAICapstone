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

// ===== PAGE =====
export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ totalCandidates: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Karena ini route protected, interceptor di axios.ts akan otomatis menyisipkan token JWT dari localStorage
        const response = await api.get('/api/jobs/hr/my-jobs');
        if (response.data && response.data.success) {
          setJobs(response.data.data);
          if (response.data.stats) {
            setStats({ totalCandidates: response.data.stats.total_candidates });
          }
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
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-8">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary mb-1">Recruitment Dashboard</h2>
          <p className="text-on-surface-variant font-body text-sm">Welcome back. Here's what's happening with your hiring today.</p>
        </div>
        <Link href="/dashboard/create">
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-lg font-label font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm flex items-center space-x-2">
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Buat Lowongan</span>
          </button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Metric Card 1 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 hover:bg-surface-container-high transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-surface-container-low rounded-lg text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant font-label text-xs uppercase tracking-wider mb-1">Total Openings</p>
            <h3 className="text-4xl font-headline font-bold text-on-surface">{isLoading ? '-' : jobs.length}</h3>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 hover:bg-surface-container-high transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-surface-container-low rounded-lg text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant font-label text-xs uppercase tracking-wider mb-1">Total Candidates</p>
            <h3 className="text-4xl font-headline font-bold text-on-surface">{isLoading ? '-' : stats.totalCandidates}</h3>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 hover:bg-surface-container-high transition-colors hidden lg:block">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-container rounded-lg text-on-secondary-container">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant font-label text-xs uppercase tracking-wider mb-1">Hire Rate</p>
            <h3 className="text-4xl font-headline font-bold text-on-surface">12%</h3>
          </div>
        </div>

        {/* Metric Card 4 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 hover:bg-surface-container-high transition-colors hidden lg:block">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-surface-container-low rounded-lg text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>event_available</span>
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant font-label text-xs uppercase tracking-wider mb-1">Interviews Today</p>
            <h3 className="text-4xl font-headline font-bold text-on-surface">8</h3>
          </div>
        </div>
      </div>

      {/* Content Section: Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden">
        <div className="px-6 py-5 bg-surface-container-low border-b border-outline-variant/15 flex justify-between items-center">
          <h3 className="text-lg font-headline font-semibold text-on-surface">Active Job Openings</h3>
          <button className="text-primary hover:text-primary-container font-label text-sm flex items-center space-x-1">
            <span>View All</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest text-on-surface-variant font-label border-b border-outline-variant/15">
                <th className="px-6 py-4 font-semibold">Job Title</th>
                <th className="px-6 py-4 font-semibold">Date Posted</th>
                <th className="px-6 py-4 font-semibold">Candidates</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                    Loading jobs...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                    No active job openings found.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-surface-container-high transition-colors group">
                    <td className="px-6 py-4">
                      <Link href={`/jobs/${job.job_id}`} className="font-medium text-on-surface hover:text-primary transition-colors block">
                        {job.title}
                      </Link>
                      <div className="text-xs text-on-surface-variant mt-0.5">
                        {job.employment_type} • {job.location || 'Remote'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      {formatDate(job.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container-low text-on-surface">
                        0 Applied
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {job.is_active ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-container text-on-secondary-container">
                          Open
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-container text-on-error-container">
                          Closed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/jobs/${job.job_id}`}>
                          <button className="text-on-surface-variant hover:text-primary p-1 rounded-md hover:bg-surface-container-low">
                            <span className="material-symbols-outlined text-sm">visibility</span>
                          </button>
                        </Link>
                        <button className="text-on-surface-variant hover:text-primary p-1 rounded-md hover:bg-surface-container-low">
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
    </AdminLayout>
  );
}
