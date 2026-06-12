'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

const INITIAL_FORM_DATA: JobFormData = {
  jobTitle: '', employmentType: 'Full-time', workSetup: 'Remote', location: '',
  aboutRole: '', responsibilities: '', qualifications: '',
  aiMatchScore: 85, autoEmailQualified: true, autoEmailRegret: false,
};

const STEPS = [
  { id: 1, label: 'Informasi Dasar', icon: 'info' },
  { id: 2, label: 'Peran & Persyaratan', icon: 'description' },
  { id: 3, label: 'Konfigurasi AI', icon: 'psychology' },
];

export default function CreateJobPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<JobFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
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

  const handlePublish = async () => {
    if (!validateStep(activeStep)) return;
    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.jobTitle, employment_type: formData.employmentType,
        work_setup: formData.workSetup, location: formData.location,
        description: formData.aboutRole, key_responsibilities: formData.responsibilities,
        minimum_qualifications: formData.qualifications, threshold_score: formData.aiMatchScore,
      };
      await api.post('/api/jobs', payload);
      router.push('/dashboard');
    } catch (error) {
      console.error('Gagal mempublikasikan lowongan:', error);
      alert('Gagal mempublikasikan lowongan. Periksa koneksi atau status login Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastStep = activeStep === 3;

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors mb-4"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Kembali ke Dashboard
        </button>
        <h1 className="text-2xl font-headline font-bold text-on-surface tracking-tight mb-1">
          Buat Lowongan Baru
        </h1>
        <p className="text-sm text-on-surface-variant">
          Isi detail lowongan dalam 3 langkah mudah.
        </p>
      </div>

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
      <div className="pb-28"><div className="bg-white rounded-2xl border border-outline-variant/10 shadow-sm p-6 sm:p-8">
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
          {/* Left: step hint */}
          <span className="text-xs text-on-surface-variant hidden sm:block">
            Langkah {activeStep} dari {STEPS.length}: {STEPS[activeStep - 1].label}
          </span>

          {/* Right: actions */}
          <div className="flex items-center gap-3 ml-auto">
            {activeStep > 1 && (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors border border-outline-variant/30"
              >
                ← Sebelumnya
              </button>
            )}
            {activeStep === 1 && (
              <button
                onClick={() => router.back()}
                className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors"
              >
                Batal
              </button>
            )}
            {!isLastStep ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 active:scale-95 transition-all"
              >
                Selanjutnya →
              </button>
            ) : (
              <button
                onClick={handlePublish}
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mempublikasikan...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                    Publikasikan Lowongan
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
