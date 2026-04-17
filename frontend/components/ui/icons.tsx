import React from 'react';

// ===== BRAND =====
export const BrainIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
  </svg>
);

// ===== INFO ICONS =====
export const MapPinIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

export const BriefcaseIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export const UsersIcon = ({ className = 'w-3 h-3' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// ===== FORM ICONS =====
export const FileTextIcon = ({ className = 'w-[17px] h-[17px]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
  </svg>
);

export const UploadIcon = ({ className = 'w-5 h-5 stroke-maroon' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

export const CheckIcon = ({ className = 'w-2.5 h-2.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 6 5 9 10 3" />
  </svg>
);

export const AlertIcon = ({ className = 'w-3 h-3 shrink-0' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

export const PdfIcon = ({ className = 'w-4 h-4 stroke-success' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);

export const XIcon = ({ className = 'w-[15px] h-[15px]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 6-12 12" /><path d="m6 6 12 12" />
  </svg>
);

export const LockIcon = ({ className = 'w-[13px] h-[13px] stroke-muted' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect width="11" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const SendIcon = ({ className = 'w-[15px] h-[15px]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
  </svg>
);

export const SpinnerIcon = ({ className = 'w-[15px] h-[15px] animate-spin' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const HomeIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const CheckCircleIcon = ({ className = 'w-8 h-8 stroke-success' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
  </svg>
);

// Small circle icon used in the success summary
export const CircleIcon = ({ className = 'w-[13px] h-[13px] stroke-maroon shrink-0' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
  </svg>
);
