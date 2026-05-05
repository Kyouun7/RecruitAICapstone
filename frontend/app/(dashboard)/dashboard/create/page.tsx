'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import BasicInformationCard from '@/components/create-job/BasicInformationCard';
import RoleRequirementsCard from '@/components/create-job/RoleRequirementsCard';
import AIConfigurationCard from '@/components/create-job/AIConfigurationCard';
import StickyActionBar from '@/components/create-job/StickyActionBar';
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

export default function CreateJobPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<JobFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));
  const handleScoreChange = (value: number) => setFormData((prev) => ({ ...prev, aiMatchScore: value }));
  const handleToggleQualified = () => setFormData((prev) => ({ ...prev, autoEmailQualified: !prev.autoEmailQualified }));
  const handleToggleRegret = () => setFormData((prev) => ({ ...prev, autoEmailRegret: !prev.autoEmailRegret }));
  const handleCancel = () => router.back();

  const handlePublish = async () => {
    if (!formData.jobTitle.trim()) { alert('Judul posisi wajib diisi.'); return; }
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

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-headline font-bold text-on-surface tracking-tight mb-2">Buat Lowongan Baru</h1>
        <p className="text-on-surface-variant font-body">Atur detail lowongan dan konfigurasi parameter penyaringan AI untuk pemfilteran kandidat otomatis.</p>
      </div>
      <div className="space-y-8">
        <BasicInformationCard jobTitle={formData.jobTitle} employmentType={formData.employmentType} workSetup={formData.workSetup} location={formData.location} onFieldChange={handleFieldChange}/>
        <RoleRequirementsCard aboutRole={formData.aboutRole} responsibilities={formData.responsibilities} qualifications={formData.qualifications} onFieldChange={handleFieldChange}/>
        <AIConfigurationCard aiMatchScore={formData.aiMatchScore} autoEmailQualified={formData.autoEmailQualified} autoEmailRegret={formData.autoEmailRegret} onScoreChange={handleScoreChange} onToggleQualified={handleToggleQualified} onToggleRegret={handleToggleRegret}/>
      </div>
      <StickyActionBar onCancel={handleCancel} onPublish={handlePublish} isSubmitting={isSubmitting}/>
    </AdminLayout>
  );
}