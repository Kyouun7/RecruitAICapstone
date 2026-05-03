'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import BasicInformationCard from '@/components/create-job/BasicInformationCard';
import RoleRequirementsCard from '@/components/create-job/RoleRequirementsCard';
import AIConfigurationCard from '@/components/create-job/AIConfigurationCard';
import StickyActionBar from '@/components/create-job/StickyActionBar';
import api from '@/lib/axios';

interface JobFormData {
  jobTitle: string;
  employmentType: string;
  workSetup: string;
  location: string;
  aboutRole: string;
  responsibilities: string;
  qualifications: string;
  aiMatchScore: number;
  autoEmailQualified: boolean;
  autoEmailRegret: boolean;
}

const INITIAL_FORM_DATA: JobFormData = {
  jobTitle: '',
  employmentType: 'Full-time',
  workSetup: 'Remote',
  location: '',
  aboutRole: '',
  responsibilities: '',
  qualifications: '',
  aiMatchScore: 85,
  autoEmailQualified: true,
  autoEmailRegret: false,
};

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id as string;

  const [formData, setFormData] = useState<JobFormData>(INITIAL_FORM_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // ---- Fetch existing job data ----
  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await api.get(`/api/jobs/${jobId}`);
        if (res.data.success) {
          const job = res.data.data;
          setFormData({
            jobTitle: job.title || '',
            employmentType: job.employment_type || 'Full-time',
            workSetup: job.work_setup || 'Remote',
            location: job.location || '',
            aboutRole: job.description || '',
            responsibilities: job.key_responsibilities || '',
            qualifications: job.minimum_qualifications || '',
            aiMatchScore: job.threshold_score ?? 85,
            autoEmailQualified: true,
            autoEmailRegret: false,
          });
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }
    if (jobId) fetchJob();
  }, [jobId]);

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleScoreChange = (value: number) => {
    setFormData((prev) => ({ ...prev, aiMatchScore: value }));
  };

  const handleToggleQualified = () => {
    setFormData((prev) => ({ ...prev, autoEmailQualified: !prev.autoEmailQualified }));
  };

  const handleToggleRegret = () => {
    setFormData((prev) => ({ ...prev, autoEmailRegret: !prev.autoEmailRegret }));
  };

  const handleCancel = () => {
    router.push(`/dashboard/${jobId}`);
  };

  const handlePublish = async () => {
    if (!formData.jobTitle.trim()) {
      alert('Job title wajib diisi.');
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.jobTitle,
        employment_type: formData.employmentType,
        work_setup: formData.workSetup,
        location: formData.location,
        description: formData.aboutRole,
        key_responsibilities: formData.responsibilities,
        minimum_qualifications: formData.qualifications,
        threshold_score: formData.aiMatchScore,
      };

      await api.put(`/api/jobs/${jobId}`, payload);
      router.push(`/dashboard/${jobId}`);
    } catch (error) {
      console.error('Failed to update job:', error);
      alert('Gagal menyimpan perubahan. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- Not found ----
  if (!isLoading && notFound) {
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

  // ---- Loading skeleton ----
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="mb-10">
          <div className="h-10 bg-surface-container-high rounded animate-pulse w-72 mb-2" />
          <div className="h-4 bg-surface-container-high rounded animate-pulse w-96" />
        </div>
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-8 border border-gray-100 animate-pulse">
              <div className="h-6 bg-surface-container-high rounded w-48 mb-4" />
              <div className="space-y-3">
                <div className="h-10 bg-surface-container-high rounded" />
                <div className="h-10 bg-surface-container-high rounded" />
              </div>
            </div>
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-headline font-bold text-on-surface tracking-tight mb-2">
          Edit Job Vacancy
        </h1>
        <p className="text-on-surface-variant font-body">
          Perbarui detail lowongan dan konfigurasi AI screening.
        </p>
      </div>

      {/* Form Sections */}
      <div className="space-y-8">
        <BasicInformationCard
          jobTitle={formData.jobTitle}
          employmentType={formData.employmentType}
          workSetup={formData.workSetup}
          location={formData.location}
          onFieldChange={handleFieldChange}
        />

        <RoleRequirementsCard
          aboutRole={formData.aboutRole}
          responsibilities={formData.responsibilities}
          qualifications={formData.qualifications}
          onFieldChange={handleFieldChange}
        />

        <AIConfigurationCard
          aiMatchScore={formData.aiMatchScore}
          autoEmailQualified={formData.autoEmailQualified}
          autoEmailRegret={formData.autoEmailRegret}
          onScoreChange={handleScoreChange}
          onToggleQualified={handleToggleQualified}
          onToggleRegret={handleToggleRegret}
        />
      </div>

      <StickyActionBar
        onCancel={handleCancel}
        onPublish={handlePublish}
        isSubmitting={isSubmitting}
        publishLabel="Simpan Perubahan"
      />
    </AdminLayout>
  );
}