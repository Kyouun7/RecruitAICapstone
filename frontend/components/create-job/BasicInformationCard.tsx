'use client';

interface BasicInformationCardProps {
  jobTitle: string;
  employmentType: string;
  workSetup: string;
  location: string;
  onFieldChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

const WORK_SETUP_OPTIONS = ['Remote', 'Hybrid', 'On-site'] as const;
const EMPLOYMENT_OPTIONS = ['Full-time', 'Part-time', 'Kontrak', 'Magang'];

export default function BasicInformationCard({ jobTitle, employmentType, workSetup, location, onFieldChange, errors = {} }: BasicInformationCardProps) {
  return (
    <section className="space-y-6">
      {/* Card header */}
      <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/15">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary text-[20px]">info</span>
        </div>
        <div>
          <h2 className="text-base font-bold text-on-surface">Informasi Dasar</h2>
          <p className="text-xs text-on-surface-variant">Detail umum lowongan yang ditampilkan ke kandidat.</p>
        </div>
      </div>

      {/* Judul Posisi */}
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">
          Judul Posisi <span className="text-error">*</span>
        </label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => onFieldChange('jobTitle', e.target.value)}
          placeholder="contoh: Senior Software Engineer"
          className={`w-full px-4 py-3 rounded-xl bg-surface-container-low border text-sm transition-all outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40
            ${errors.jobTitle ? 'border-error/50 bg-error-container/10' : 'border-outline-variant/20 hover:border-outline-variant/40'}`}
        />
        {errors.jobTitle && (
          <p className="mt-1.5 text-xs text-error flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {errors.jobTitle}
          </p>
        )}
      </div>

      {/* Tipe Pekerjaan + Sistem Kerja */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">
            Tipe Pekerjaan <span className="text-error">*</span>
          </label>
          <div className="relative">
            <select
              value={employmentType}
              onChange={(e) => onFieldChange('employmentType', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-sm text-on-surface transition-all outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 cursor-pointer appearance-none"
            >
              {EMPLOYMENT_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-on-surface mb-1.5">Sistem Kerja</label>
          <div className="flex gap-2">
            {WORK_SETUP_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onFieldChange('workSetup', option)}
                className={`flex-1 py-3 rounded-xl text-xs font-semibold transition-all border
                  ${workSetup === option
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant border-outline-variant/20 hover:border-primary/30 hover:text-primary'
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lokasi */}
      <div>
        <label className="block text-sm font-semibold text-on-surface mb-1.5">
          Lokasi <span className="text-error">*</span>
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">location_on</span>
          <input
            type="text"
            value={location}
            onChange={(e) => onFieldChange('location', e.target.value)}
            placeholder="Jakarta, Indonesia atau Remote"
            className={`w-full pl-11 pr-4 py-3 rounded-xl bg-surface-container-low border text-sm transition-all outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40
              ${errors.location ? 'border-error/50 bg-error-container/10' : 'border-outline-variant/20 hover:border-outline-variant/40'}`}
          />
        </div>
        {errors.location && (
          <p className="mt-1.5 text-xs text-error flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {errors.location}
          </p>
        )}
      </div>

      {/* Preview chip */}
      {jobTitle && (
        <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10">
          <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
          <span className="text-xs text-primary font-medium">
            Preview: <strong>{jobTitle}</strong> · {employmentType} · {workSetup} {location && `· ${location}`}
          </span>
        </div>
      )}
    </section>
  );
}
