'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import BasicInformationCard from '@/components/create-job/BasicInformationCard';
import RoleRequirementsCard from '@/components/create-job/RoleRequirementsCard';
import AIConfigurationCard from '@/components/create-job/AIConfigurationCard';
import StickyActionBar from '@/components/create-job/StickyActionBar';
import api from '@/lib/axios';

// ===== TYPES =====
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

// ===== PAGE =====
export default function CreateJobPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<JobFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generic field change handler
  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // AI config handlers
  const handleScoreChange = (value: number) => {
    setFormData((prev) => ({ ...prev, aiMatchScore: value }));
  };

  const handleToggleQualified = () => {
    setFormData((prev) => ({
      ...prev,
      autoEmailQualified: !prev.autoEmailQualified,
    }));
  };

  const handleToggleRegret = () => {
    setFormData((prev) => ({
      ...prev,
      autoEmailRegret: !prev.autoEmailRegret,
    }));
  };

  // Action handlers
  const handleCancel = () => {
    router.back();
  };

  const handlePublish = async () => {
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
        threshold_score: formData.aiMatchScore
      };

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      const response = await api.post('/api/jobs', payload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        }
      });
      
      console.log('Published successfully:', response.data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to publish job:', error);
      alert('Failed to publish job. Please check your connection or login status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-headline font-bold text-on-surface tracking-tight mb-2">
          Create New Job Vacancy
        </h1>
        <p className="text-on-surface-variant font-body">
          Set up job details and configure AI screening parameters for automated
          candidate filtering.
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

      {/* Sticky Action Bar */}
      <StickyActionBar
        onCancel={handleCancel}
        onPublish={handlePublish}
        isSubmitting={isSubmitting}
      />
    </AdminLayout>
  );
}