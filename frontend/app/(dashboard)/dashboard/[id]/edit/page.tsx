'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import BasicInformationCard from '@/components/create-job/BasicInformationCard';
import RoleRequirementsCard from '@/components/create-job/RoleRequirementsCard';
import AIConfigurationCard from '@/components/create-job/AIConfigurationCard';
import api from '@/lib/axios';

interface JobFormData {
  jobTitle: string; employmentType: string; workSetup: string; location: string;
  aboutRole: string; responsibilities: string; qualifications: string;
  aiMatchScore: number; autoEmailQualified: boolean; autoEmailRegret: boolean;
}

const STEPS = [
  { id: 1, label: 'Informasi Dasar', icon: 'info' },
  { id: 2, label: 'Peran & Persyaratan', icon: 'description' },
  { id: 3, label: 'Konfigurasi AI', icon: 'psychology' },
];

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id as string;

  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: '', employmentType: 'Full-time', workSetup: 'Remote', location: '',
    aboutRole: '', responsibilities: '', qualifications: '',
    aiMatchScore: 85, autoEmailQualified: true, autoEmailRegret: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      // Cek token dulu sebelum fetch
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        router.push('/login');
        return;
      }
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
      } catch (err: any) {
        if (err.response?.status === 404) {
          setNotFound(true);
        } else if (err.response?.status === 401) {
          router.push('/login');
        } else {
          setNotFound(true);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (jobId) fetchJob();
  }, [jobId, router]);

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
    setSaveError('');
  };
  const handleScoreChange = (value: number) => setFormData((prev) => ({ ...prev, aiMatchScore: value }));
  const handleToggleQualified = () => setFormData((prev) => ({ ...prev, autoEmailQualified: !prev.autoEmailQualified }));
  const handleToggleRegret = () => setFormData((prev) => ({ ...prev, autoEmailRegret: !prev.autoEmailRegret }));

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Judul posisi wajib diisi';
      if (!formData.location.trim()) newErrors.location = 'Lokasi wajib diisi';
    }
    if (step === 2) {
      if (!formData.aboutRole.trim()) newErrors.aboutRole = 'Deskripsi posisi wajib diisi';
      if (!formData.responsibilities.trim()) newErrors.responsibilities = 'Tanggung jawab wajib diisi';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(activeStep)) return;
    setActiveStep((s) => Math.min(s + 1, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!validateStep(activeStep)) return;
    setSaveError('');
    setSaveSuccess(false);
    setIsSubmitting(true);
    try {
      await api.put(`/api/jobs/${jobId}`, {
        title: formData.jobTitle,
        employment_type: formData.employmentType,
        work_setup: formData.workSetup,
        location: formData.location,
        description: formData.aboutRole,
        key_responsibilities: formData.responsibilities,
        minimum_qualifications: formData.qualifications,
        threshold_score: formData.aiMatchScore,
      });
      setSaveSuccess(true);
      setTimeout(() => {
        router.push(`/dashboard/${jobId}`);
      }, 800);
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 401) {
        setSaveError('Sesi login habis. Silakan login ulang.');
        setTimeout(() => router.push('/login'), 1500);
      } else if (status === 404) {
        setSaveError('Lowongan tidak ditemukan di server.');
      } else if (status === 400) {
        setSaveError(error.response?.data?.message || 'Data tidak valid. Periksa kembali isian form.');
      } else {
        setSaveError('Gagal menyimpan perubahan. Periksa koneksi internet dan coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- Not found ----
  if (!isLoading && notFound) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="material-symbols-outlined text-6xl text-error mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
          <h2 className="text-2xl font-bold text-on-surface mb-2">Lowongan tidak ditemukan</h2>
          <p className="text-sm text-on-surface-variant mb-4">Lowongan mungkin sudah dihapus atau ID tidak valid.</p>
          <button onClick={() => router.push('/dashboard')} className="mt-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
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
        <div className="mb-8 space-y-2">
          <div className="h-5 bg-surface-container-high rounded animate-pulse w-40" />
          <div className="h-8 bg-surface-container-high rounded animate-pulse w-64" />
          <div className="h-4 bg-surface-container-high rounded animate-pulse w-80" />
        </div>
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
              <div className="w-8 h-8 rounded-full bg-surface-container-high animate-pulse flex-shrink-0" />
              <div className="h-3 bg-surface-container-high rounded animate-pulse w-20 hidden sm:block" />
              {i < 3 && <div className="flex-1 h-px bg-surface-container-high ml-2" />}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-outline-variant/10 shadow-sm p-6 sm:p-8 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-surface-container-high rounded animate-pulse w-28" />
              <div className="h-11 bg-surface-container-high rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </AdminLayout>
    );
  }

  const isLastStep = activeStep === 3;

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push(`/dashboard/${jobId}`)}
          className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors mb-4"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Kembali ke Detail Lowongan
        </button>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-headline font-bold text-on-surface tracking-tight mb-1">
              Edit Lowongan
            </h1>
            <p className="text-sm text-on-surface-variant">
              {formData.jobTitle ? <><strong className="text-primary">{formData.jobTitle}</strong> · Perbarui detail dan konfigurasi AI.</> : 'Perbarui detail lowongan dan konfigurasi AI screening.'}
            </p>
          </div>
          {/* Status indicator */}
          {saveSuccess ? (
            <span className="flex-shrink-0 flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1.5 rounded-full font-medium">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Tersimpan!
            </span>
          ) : (
            <span className="flex-shrink-0 flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200/60 px-3 py-1.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Belum disimpan
            </span>
          )}
        </div>
      </div>

      {/* Error banner */}
      {saveError && (
        <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <span className="material-symbols-outlined text-red-500 text-[20px] flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
          <p className="text-sm text-red-700 font-medium">{saveError}</p>
          <button onClick={() => setSaveError('')} className="ml-auto text-red-400 hover:text-red-600 flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Step Indicator */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((step, idx) => {
          const isDone = activeStep > step.id;
          const isActive = activeStep === step.id;
          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => isDone && setActiveStep(step.id)}
                className={`flex items-center gap-2 group ${isDone ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0
                  ${isActive ? 'bg-primary text-white shadow-md shadow-primary/30' : isDone ? 'bg-primary/15 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  {isDone
                    ? <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    : <span>{step.id}</span>
                  }
                </div>
                <span className={`text-xs font-semibold hidden sm:block transition-colors
                  ${isActive ? 'text-primary' : isDone ? 'text-primary/70' : 'text-on-surface-variant'}`}>
                  {step.label}
                </span>
              </button>
              {idx < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-3 transition-colors ${activeStep > step.id ? 'bg-primary/30' : 'bg-outline-variant/30'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="pb-28">
        <div className="bg-white rounded-2xl border border-outline-variant/10 shadow-sm p-6 sm:p-8">
          {activeStep === 1 && (
            <BasicInformationCard
              jobTitle={formData.jobTitle}
              employmentType={formData.employmentType}
              workSetup={formData.workSetup}
              location={formData.location}
              onFieldChange={handleFieldChange}
              errors={errors}
            />
          )}
          {activeStep === 2 && (
            <RoleRequirementsCard
              aboutRole={formData.aboutRole}
              responsibilities={formData.responsibilities}
              qualifications={formData.qualifications}
              onFieldChange={handleFieldChange}
              errors={errors}
            />
          )}
          {activeStep === 3 && (
            <AIConfigurationCard
              aiMatchScore={formData.aiMatchScore}
              autoEmailQualified={formData.autoEmailQualified}
              autoEmailRegret={formData.autoEmailRegret}
              onScoreChange={handleScoreChange}
              onToggleQualified={handleToggleQualified}
              onToggleRegret={handleToggleRegret}
            />
          )}
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white border-t border-gray-100 px-4 sm:px-8 py-3 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <span className="text-xs text-on-surface-variant hidden sm:block">
            Langkah {activeStep} dari {STEPS.length}: {STEPS[activeStep - 1].label}
          </span>
          <div className="flex items-center gap-3 ml-auto">
            {activeStep > 1 && (
              <button onClick={handleBack} className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors border border-outline-variant/30">
                ← Sebelumnya
              </button>
            )}
            {activeStep === 1 && (
              <button onClick={() => router.push(`/dashboard/${jobId}`)} className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">
                Batal
              </button>
            )}
            {!isLastStep ? (
              <button onClick={handleNext} className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 active:scale-95 transition-all">
                Selanjutnya →
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={isSubmitting || saveSuccess}
                className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Menyimpan...
                  </>
                ) : saveSuccess ? (
                  <>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Tersimpan!
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
                    Simpan Perubahan
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </footer>
    </AdminLayout>
  );
}