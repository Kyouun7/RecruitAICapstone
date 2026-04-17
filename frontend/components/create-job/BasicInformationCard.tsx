'use client';

interface BasicInformationCardProps {
  jobTitle: string;
  employmentType: string;
  workSetup: string;
  location: string;
  onFieldChange: (field: string, value: string) => void;
}

const WORK_SETUP_OPTIONS = ['Remote', 'Hybrid', 'On-site'] as const;

const EMPLOYMENT_OPTIONS = ['Full-time', 'Part-time', 'Contract', 'Internship'];

export default function BasicInformationCard({
  jobTitle,
  employmentType,
  workSetup,
  location,
  onFieldChange,
}: BasicInformationCardProps) {
  return (
    <section className="bg-surface-lowest rounded-xl p-8 shadow-[0_12px_32px_-4px_rgba(25,28,29,0.06)]">
      <h2 className="text-xl font-headline font-semibold mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">info</span>
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Title — full width */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
            Job Title <span className="text-error">*</span>
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => onFieldChange('jobTitle', e.target.value)}
            placeholder="e.g. Senior Software Engineer"
            className="w-full px-4 py-3 rounded-lg bg-surface-low border-none input-ghost-focus font-body transition-all"
          />
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
            Employment Type <span className="text-error">*</span>
          </label>
          <select
            value={employmentType}
            onChange={(e) => onFieldChange('employmentType', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-low border-none input-ghost-focus font-body transition-all cursor-pointer"
          >
            {EMPLOYMENT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Work Setup — segmented radio */}
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
            Work Setup
          </label>
          <div className="flex gap-3">
            {WORK_SETUP_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onFieldChange('workSetup', option)}
                className={`
                  flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-150 cursor-pointer
                  ${
                    workSetup === option
                      ? 'bg-white border border-primary text-primary shadow-sm'
                      : 'bg-surface-low text-on-surface-variant hover:bg-surface-container'
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
            Location <span className="text-error">*</span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              location_on
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) => onFieldChange('location', e.target.value)}
              placeholder="London, UK or Remote"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-low border-none input-ghost-focus font-body transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
