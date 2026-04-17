'use client';

import React from 'react';
import FormInput from '../ui/FormInput';
import FileDropzone from '../ui/FileDropzone';
import { AlertIcon, SpinnerIcon } from '../ui/icons';

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

interface ApplicationFormProps {
  formData: FormData;
  errors: FormErrors;
  selectedFile: File | null;
  agreed: boolean;
  isDragging: boolean;
  isSubmitting: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  onToggleAgree: () => void;
  onSubmit: () => void;
}

export default function ApplicationForm({
  formData,
  errors,
  selectedFile,
  isDragging,
  isSubmitting,
  fileInputRef,
  onInputChange,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  onFileChange,
  onRemoveFile,
  onSubmit,
}: ApplicationFormProps) {
  // Email suggestion chips
  const emailSuggestions = [
    {
      label: '@gmail.com',
      onSelect: () => {
        const name = formData.email.split('@')[0] || formData.email;
        if (name) {
          const synth = { target: { name: 'email', value: name + '@gmail.com' } } as React.ChangeEvent<HTMLInputElement>;
          onInputChange(synth);
        }
      },
    },
    {
      label: '@outlook.com',
      onSelect: () => {
        const name = formData.email.split('@')[0] || formData.email;
        if (name) {
          const synth = { target: { name: 'email', value: name + '@outlook.com' } } as React.ChangeEvent<HTMLInputElement>;
          onInputChange(synth);
        }
      },
    },
    {
      label: '@icloud.com',
      onSelect: () => {
        const name = formData.email.split('@')[0] || formData.email;
        if (name) {
          const synth = { target: { name: 'email', value: name + '@icloud.com' } } as React.ChangeEvent<HTMLInputElement>;
          onInputChange(synth);
        }
      },
    },
  ];

  return (
    <div className="bg-surface-lowest rounded-xl p-8 md:p-12 shadow-sm border border-surface-highest">
      <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        {/* Full Name */}
        <FormInput
          id="fullName"
          name="fullName"
          type="text"
          label="Full Name"
          required
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={onInputChange}
          error={errors.fullName}
          autoComplete="name"
        />

        {/* Email Address */}
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          required
          placeholder="name@company.com"
          value={formData.email}
          onChange={onInputChange}
          error={errors.email}
          autoComplete="email"
          suggestions={emailSuggestions}
        />

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface" htmlFor="phone">
            Phone Number <span className="text-error">*</span>
          </label>
          <div className="flex gap-3">
            {/* Country code selector */}
            <div className="relative min-w-[100px]">
              <div className="bg-surface-low h-full flex items-center justify-between px-3 rounded-lg cursor-pointer hover:bg-surface-high transition-colors">
                <span className="flex items-center gap-2 font-medium text-sm">🇮🇩 +62</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </div>
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={onInputChange}
              placeholder="812 3456 7890"
              autoComplete="tel"
              className={`
                flex-grow bg-surface-low border-none rounded-lg py-4 px-4
                text-on-surface transition-all
                placeholder:text-outline
                focus-primary
                ${errors.phone ? 'ring-2 ring-error' : ''}
              `}
            />
          </div>
          {errors.phone && (
            <span className="text-xs text-error flex items-center gap-1">
              <AlertIcon /> {errors.phone}
            </span>
          )}
        </div>

        {/* Portfolio Link */}
        <FormInput
          id="portfolio"
          name="portfolio"
          type="url"
          label="Portfolio Link"
          optional
          placeholder="https://"
          value={formData.portfolio}
          onChange={onInputChange}
          autoComplete="url"
          prefix={<span className="material-symbols-outlined text-xl">link</span>}
        />

        {/* Upload CV */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface">
            Upload CV <span className="text-error">*</span>
          </label>
          <FileDropzone
            selectedFile={selectedFile}
            error={errors.cv}
            isDragging={isDragging}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onFileSelect={onFileSelect}
            onRemove={onRemoveFile}
            fileInputRef={fileInputRef}
            onFileChange={onFileChange}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full bg-primary text-on-primary py-5 rounded-xl font-bold text-lg
              flex items-center justify-center gap-3
              shadow-lg shadow-primary/20
              hover:opacity-90 active:scale-[0.98] transition-all
              disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            {isSubmitting ? (
              <>
                <SpinnerIcon className="w-5 h-5 animate-spin text-white" />
                Mengirim...
              </>
            ) : (
              <>
                Kirim Lamaran
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>

          {/* Agreement text */}
          <p className="text-center text-xs text-on-surface-variant mt-4">
            By clicking &quot;Kirim Lamaran&quot;, you agree to RecruitAI&#39;s{' '}
            <a href="#" className="underline font-medium hover:text-primary transition-colors">Privacy Policy</a>
            {' '}and{' '}
            <a href="#" className="underline font-medium hover:text-primary transition-colors">Terms of Service</a>.
          </p>

          {errors.agree && (
            <span className="text-xs text-error flex items-center justify-center gap-1 mt-2">
              <AlertIcon /> {errors.agree}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
