'use client';

import { useState, useRef, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ApplicationForm from '@/components/apply/ApplicationForm';
import SuccessView from '@/components/apply/SuccessView';
import api from '@/lib/axios';

// ===== TYPES =====
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  portfolio: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  cv?: string;
  agree?: string;
}

interface JobData {
  title: string;
  location: string;
  employment_type: string;
  job_id: string;
}

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const jobIdParam = searchParams.get('jobId');

  // --- State ---
  const [job, setJob] = useState<JobData | null>(null);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [jobError, setJobError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Fetch Job Data ---
  useEffect(() => {
    async function fetchJob() {
      if (!jobIdParam) {
        setJobError('URL tidak memiliki ID Pekerjaan (?jobId=...).');
        setIsLoadingJob(false);
        return;
      }
      try {
        const res = await api.get(`/api/jobs/${jobIdParam}`);
        setJob(res.data.data);
      } catch (err: any) {
        console.error('Failed to fetch job:', err);
        setJobError('Pekerjaan yang Anda cari tidak ditemukan atau telah ditutup.');
      } finally {
        setIsLoadingJob(false);
      }
    }
    fetchJob();
  }, [jobIdParam]);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (value.trim()) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFile = useCallback((file: File) => {
    if (file.type !== 'application/pdf') {
      setErrors(prev => ({ ...prev, cv: 'Hanya file PDF yang diterima' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, cv: 'Ukuran file melebihi 5 MB' }));
      return;
    }
    setSelectedFile(file);
    setErrors(prev => ({ ...prev, cv: undefined }));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleAgree = () => {
    setAgreed(!agreed);
    setErrors(prev => ({ ...prev, agree: undefined }));
  };

  // --- Validation ---
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) newErrors.fullName = 'Nama lengkap wajib diisi';
    if (!formData.email.trim() || !emailRe.test(formData.email))
      newErrors.email = 'Format email tidak valid';
    
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10 || cleanPhone.length > 15) {
      newErrors.phone = 'Telepon harus 10-15 digit';
    }

    if (!selectedFile) {
      newErrors.cv = 'File CV wajib diunggah (PDF, maks 5 MB)';
    } else {
      if (selectedFile.type !== 'application/pdf') {
        newErrors.cv = 'Hanya file PDF yang diperbolehkan';
      } else if (selectedFile.size > 5 * 1024 * 1024) {
        newErrors.cv = 'File maksimal 5MB';
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstErrKey = Object.keys(newErrors)[0];
      const el = document.getElementById(
        firstErrKey === 'cv' ? 'fileDrop' : firstErrKey === 'agree' ? 'agreeWrap' : firstErrKey
      );
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return Object.keys(newErrors).length === 0;
  };

  // --- Submit ---
  const handleSubmit = async () => {
    if (!validate() || !job) return;
    setApiErrors([]);
    setIsSubmitting(true);
    
    try {
      const payload = new FormData();
      payload.append('nama', formData.fullName);
      payload.append('email', formData.email);
      payload.append('telepon', formData.phone.replace(/\D/g, ''));
      // Gunakan data aktual dari database
      payload.append('posisi', job.title); 
      payload.append('job_id', job.job_id || jobIdParam || ''); 
      if (formData.portfolio) {
        payload.append('portofolio', formData.portfolio);
      }
      payload.append('cv_file', selectedFile!);

      await api.post('/api/candidates', payload);
      
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.error("API Submission Error:", error);
      setIsSubmitting(false);
      
      if (error.response) {
        const data = error.response.data;
        if (data?.errors && Array.isArray(data.errors)) {
          setApiErrors(data.errors);
        } else if (data?.message) {
          setApiErrors([data.message]);
        } else {
          setApiErrors([`Kesalahan server: ${error.response.status} ${error.response.statusText}`]);
        }
      } else if (error.request) {
        setApiErrors(['Gagal terhubung ke server. Pastikan backend aktif.', `Detail: ${error.message}`]);
      } else {
        setApiErrors([`Terjadi kesalahan: ${error.message}`]);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({ fullName: '', email: '', phone: '', portfolio: '' });
    setSelectedFile(null);
    setApiErrors([]);
    setAgreed(false);
  };

  // --- Render Loading/Error States ---
  if (isLoadingJob) {
    return (
      <div className="flex-grow flex items-center justify-center pt-32 pb-24">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-primary font-bold animate-pulse">Memuat data pekerjaan...</div>
        </div>
      </div>
    );
  }

  if (jobError || !job) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center pt-32 pb-24 text-center px-4">
        <span className="material-symbols-outlined text-6xl text-error mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Oops!</h2>
        <p className="text-on-surface-variant max-w-md">{jobError}</p>
      </div>
    );
  }

  // ===== RENDER MAIN FORM =====
  return (
    <main className="flex-grow pt-32 pb-24 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-2 font-headline">
            {job.title}
          </h1>
          <p className="text-on-surface-variant font-medium flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">location_on</span>
            {job.location || 'Remote'}
            <span className="text-outline-variant">•</span>
            <span className="material-symbols-outlined text-base">work</span>
            {job.employment_type || 'Full-time'}
          </p>
        </header>

        {/* Conditional: Success or Form */}
        {apiErrors.length > 0 && !isSuccess && (
          <div className="mb-8 p-4 rounded-xl bg-error-container text-on-error-container border border-error/50 flex flex-col gap-2 shadow-sm animate-in fade-in zoom-in-95 transition-all">
            <div className="flex items-center gap-2 font-bold mb-1">
              <span className="material-symbols-outlined text-error">error</span>
              Gagal Mengirim Lamaran
            </div>
            <ul className="list-disc list-inside text-sm pl-2 space-y-1">
              {apiErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {isSuccess ? (
          <SuccessView
            formData={formData}
            fileName={selectedFile?.name || ''}
            onReset={handleReset}
          />
        ) : (
          <ApplicationForm
            formData={formData}
            errors={errors}
            selectedFile={selectedFile}
            agreed={agreed}
            isDragging={isDragging}
            isSubmitting={isSubmitting}
            fileInputRef={fileInputRef}
            onInputChange={handleInputChange}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileSelect={() => fileInputRef.current?.click()}
            onFileChange={handleFileChange}
            onRemoveFile={removeFile}
            onToggleAgree={toggleAgree}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
}

// ===== MAIN PAGE COMPONENT =====
export default function ApplyPage() {
  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-on-surface">
      <Suspense fallback={
        <div className="flex-grow flex items-center justify-center pt-32 pb-24">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <ApplyFormContent />
      </Suspense>
    </div>
  );
}