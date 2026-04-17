'use client';

interface RoleRequirementsCardProps {
  aboutRole: string;
  responsibilities: string;
  qualifications: string;
  onFieldChange: (field: string, value: string) => void;
}

export default function RoleRequirementsCard({
  aboutRole,
  responsibilities,
  qualifications,
  onFieldChange,
}: RoleRequirementsCardProps) {
  return (
    <section className="bg-surface-lowest rounded-xl p-8 shadow-[0_12px_32px_-4px_rgba(25,28,29,0.06)]">
      <h2 className="text-xl font-headline font-semibold mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">
          description
        </span>
        Role &amp; Requirements
      </h2>

      <div className="space-y-6">
        {/* About the Role */}
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
            About the Role <span className="text-error">*</span>
          </label>
          <textarea
            value={aboutRole}
            onChange={(e) => onFieldChange('aboutRole', e.target.value)}
            placeholder="Describe the mission and impact of this role..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-surface-low border-none input-ghost-focus font-body transition-all resize-vertical"
          />
        </div>

        {/* Key Responsibilities */}
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
            Key Responsibilities <span className="text-error">*</span>
          </label>
          <textarea
            value={responsibilities}
            onChange={(e) => onFieldChange('responsibilities', e.target.value)}
            placeholder="List the primary duties (one per line)..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-surface-low border-none input-ghost-focus font-body transition-all resize-vertical"
          />
        </div>

        {/* Minimum Qualifications */}
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
            Minimum Qualifications
          </label>
          <textarea
            value={qualifications}
            onChange={(e) => onFieldChange('qualifications', e.target.value)}
            placeholder="Degree, years of experience, certifications..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-surface-low border-none input-ghost-focus font-body transition-all resize-vertical"
          />
        </div>
      </div>
    </section>
  );
}
