import React from 'react';
import { CheckCircleIcon, HomeIcon } from '../ui/icons';

interface SuccessViewProps {
  formData: {
    fullName: string;
    email: string;
  };
  fileName: string;
  onReset: () => void;
}

export default function SuccessView({ formData, fileName, onReset }: SuccessViewProps) {
  const summaryRows = [
    { label: 'Nama', value: formData.fullName },
    { label: 'Email', value: formData.email },
    { label: 'File CV', value: fileName || '—' },
  ];

  return (
    <div className="bg-surface-lowest rounded-xl border border-surface-highest shadow-sm p-12 px-6 text-center">
      {/* Animated check circle */}
      <div className="w-[72px] h-[72px] rounded-full bg-success-bg flex items-center justify-center mx-auto mb-5 animate-pop-in">
        <CheckCircleIcon />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-on-surface mb-2 flex items-center justify-center gap-2 font-[family-name:var(--font-manrope)]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#16A34A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 11 3 3L22 4" />
        </svg>
        Lamaran Berhasil Dikirim!
      </h2>

      {/* Description */}
      <p className="text-sm text-on-surface-variant max-w-[440px] mx-auto mb-8 leading-relaxed">
        Terima kasih telah mendaftar di PT. Jalin Mayantara Indonesia. CV kamu sedang
        diproses oleh sistem AI RecruitAI dan hasilnya akan dikirimkan ke email kamu.
      </p>

      {/* Summary card */}
      <div className="inline-flex flex-col gap-3 py-4 px-6 bg-primary-container/30 border border-outline-variant/30 rounded-xl mb-8 text-left">
        {summaryRows.map((row, i) => (
          <div key={i} className="flex gap-2 items-center text-sm">
            <span className="material-symbols-outlined text-primary text-base">check_circle</span>
            <span>
              {row.label}: <strong className="text-primary">{row.value}</strong>
            </span>
          </div>
        ))}
      </div>

      {/* Reset button */}
      <div>
        <button
          onClick={onReset}
          className="
            inline-flex items-center gap-2 px-8 py-3 rounded-xl
            text-sm font-bold
            cursor-pointer border-none bg-primary text-on-primary shadow-primary
            hover:opacity-90 hover:shadow-primary-lg
            active:scale-[0.98] transition-all duration-150
          "
        >
          <HomeIcon className="w-4 h-4" /> Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
