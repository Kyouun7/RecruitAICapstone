'use client';

interface RoleRequirementsCardProps {
  aboutRole: string;
  responsibilities: string;
  qualifications: string;
  onFieldChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

function CharCount({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const pct = len / max;
  return (
    <span className={`text-xs tabular-nums ${pct > 0.9 ? 'text-error' : pct > 0.7 ? 'text-amber-500' : 'text-on-surface-variant'}`}>
      {len}/{max}
    </span>
  );
}

export default function RoleRequirementsCard({ aboutRole, responsibilities, qualifications, onFieldChange, errors = {} }: RoleRequirementsCardProps) {
  return (
    <section className="space-y-6">
      {/* Card header */}
      <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/15">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary text-[20px]">description</span>
        </div>
        <div>
          <h2 className="text-base font-bold text-on-surface">Peran & Persyaratan</h2>
          <p className="text-xs text-on-surface-variant">Jelaskan tanggung jawab dan kualifikasi kandidat ideal.</p>
        </div>
      </div>

      {/* Tentang Posisi */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-semibold text-on-surface">
            Tentang Posisi Ini <span className="text-error">*</span>
          </label>
          <CharCount value={aboutRole} max={1000} />
        </div>
        <p className="text-xs text-on-surface-variant mb-2">Ceritakan misi, dampak, dan konteks posisi ini dalam tim.</p>
        <textarea
          value={aboutRole}
          onChange={(e) => onFieldChange('aboutRole', e.target.value)}
          placeholder="Contoh: Kami mencari seorang Backend Engineer berpengalaman untuk memimpin pengembangan layanan API yang melayani jutaan pengguna..."
          maxLength={1000}
          rows={4}
          className={`w-full px-4 py-3 rounded-xl bg-surface-container-low border text-sm transition-all outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 resize-y
            ${errors.aboutRole ? 'border-error/50 bg-error-container/10' : 'border-outline-variant/20 hover:border-outline-variant/40'}`}
        />
        {errors.aboutRole && (
          <p className="mt-1.5 text-xs text-error flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {errors.aboutRole}
          </p>
        )}
      </div>

      {/* Tanggung Jawab */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-semibold text-on-surface">
            Tanggung Jawab Utama <span className="text-error">*</span>
          </label>
          <CharCount value={responsibilities} max={1500} />
        </div>
        <p className="text-xs text-on-surface-variant mb-2">Tulis satu poin per baris. AI akan membaca ini untuk mengevaluasi kandidat.</p>
        <textarea
          value={responsibilities}
          onChange={(e) => onFieldChange('responsibilities', e.target.value)}
          placeholder={"Merancang dan mengimplementasikan REST API\nMelakukan code review dan mentoring junior developer\nBerkolaborasi dengan tim produk untuk estimasi teknis"}
          maxLength={1500}
          rows={5}
          className={`w-full px-4 py-3 rounded-xl bg-surface-container-low border text-sm transition-all outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 resize-y font-mono
            ${errors.responsibilities ? 'border-error/50 bg-error-container/10' : 'border-outline-variant/20 hover:border-outline-variant/40'}`}
        />
        {errors.responsibilities && (
          <p className="mt-1.5 text-xs text-error flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {errors.responsibilities}
          </p>
        )}
      </div>

      {/* Kualifikasi */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-semibold text-on-surface">Kualifikasi Minimum</label>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-medium">Opsional</span>
            <CharCount value={qualifications} max={1000} />
          </div>
        </div>
        <p className="text-xs text-on-surface-variant mb-2">Gelar, tahun pengalaman, sertifikasi, atau tools yang dibutuhkan.</p>
        <textarea
          value={qualifications}
          onChange={(e) => onFieldChange('qualifications', e.target.value)}
          placeholder={"Minimal S1 Teknik Informatika atau setara\nPengalaman 3+ tahun dengan Node.js atau Python\nFamiliar dengan arsitektur microservices"}
          maxLength={1000}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-sm transition-all outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 resize-y font-mono hover:border-outline-variant/40"
        />
      </div>

      {/* AI tip */}
      <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200/60 rounded-xl">
        <span className="material-symbols-outlined text-amber-500 text-[18px] mt-0.5 flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
        <p className="text-xs text-amber-700 leading-relaxed">
          <strong>Tips AI:</strong> Semakin spesifik tanggung jawab dan kualifikasi yang kamu tulis, semakin akurat AI dalam mengevaluasi kesesuaian kandidat.
        </p>
      </div>
    </section>
  );
}
