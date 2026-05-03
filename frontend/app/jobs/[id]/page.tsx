import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getJob(id: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/jobs/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch job');
  }
  const data = await res.json();
  return data.data;
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const job = await getJob(resolvedParams.id);

  if (!job) notFound();

  const responsibilities = job.key_responsibilities
    ? job.key_responsibilities.split('\n').filter((item: string) => item.trim() !== '')
    : [];

  const qualifications = job.minimum_qualifications
    ? job.minimum_qualifications.split('\n').filter((item: string) => item.trim() !== '')
    : [];

  const jobIdParam = job.job_id || job.id;

  const postedDate = new Date(job.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="min-h-screen bg-[#f5f7fa]">

      {/* ===== HERO BANNER ===== */}
      <div className="bg-gradient-to-br from-[#001e40] via-[#002a5c] to-[#003366] pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-xs mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Jobs</span>
            <span>/</span>
            <span className="text-white/90 font-medium">{job.title}</span>
          </div>

          {/* Job Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              {/* Company Logo */}
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <span className="material-symbols-outlined text-3xl text-white/80">corporate_fare</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1.5 text-white/70 text-sm">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {job.location || 'Remote'}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="flex items-center gap-1.5 text-white/70 text-sm">
                    <span className="material-symbols-outlined text-[16px]">work</span>
                    {job.employment_type}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="flex items-center gap-1.5 text-white/70 text-sm">
                    <span className="material-symbols-outlined text-[16px]">laptop_mac</span>
                    {job.work_setup}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="flex items-center gap-1.5 text-white/70 text-sm">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    Diposting {postedDate}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-full uppercase tracking-wider backdrop-blur-sm">
                    {job.employment_type}
                  </span>
                  <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-full uppercase tracking-wider backdrop-blur-sm">
                    {job.work_setup}
                  </span>
                  {job.is_active ? (
                    <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                      ● Open
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-500/20 border border-red-400/40 text-red-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                      Closed
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Apply Button Desktop */}
            <div className="hidden md:block flex-shrink-0">
              <Link href={`/apply?jobId=${jobIdParam}`}>
                <button className="bg-white text-[#001e40] px-8 py-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Apply for this Job →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ===== LEFT: Main Content ===== */}
          <div className="lg:col-span-2 space-y-6">

            {/* About the Role */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                </div>
                <h2 className="text-lg font-bold text-[#001e40]">About the Role</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed text-sm whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Key Responsibilities */}
            {responsibilities.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-600 text-[20px]">checklist</span>
                  </div>
                  <h2 className="text-lg font-bold text-[#001e40]">Key Responsibilities</h2>
                </div>
                <ul className="space-y-3">
                  {responsibilities.map((resp: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed">
                      <span
                        className="material-symbols-outlined text-emerald-500 text-[18px] mt-0.5 flex-shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span>{resp.trim().replace(/^[-•*]\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Qualifications */}
            {qualifications.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[20px]">school</span>
                  </div>
                  <h2 className="text-lg font-bold text-[#001e40]">Requirements & Qualifications</h2>
                </div>
                <ul className="space-y-3">
                  {qualifications.map((qual: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 flex-shrink-0">
                        arrow_right
                      </span>
                      <span>{qual.trim().replace(/^[-•*]\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Apply CTA Banner */}
            <div className="bg-gradient-to-br from-[#001e40] to-[#003366] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-white font-bold text-lg mb-1">Tertarik dengan posisi ini?</p>
                <p className="text-white/60 text-sm">Submit CV kamu sekarang dan biarkan AI kami menilai kecocokanmu.</p>
              </div>
              <Link href={`/apply?jobId=${jobIdParam}`}>
                <button className="flex-shrink-0 bg-white text-[#001e40] px-7 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap">
                  Apply Sekarang →
                </button>
              </Link>
            </div>
          </div>

          {/* ===== RIGHT: Sidebar ===== */}
          <div className="space-y-5 lg:sticky lg:top-24">

            {/* Apply Button Mobile */}
            <div className="md:hidden">
              <Link href={`/apply?jobId=${jobIdParam}`}>
                <button className="w-full bg-gradient-to-br from-[#001e40] to-[#003366] text-white py-4 rounded-xl font-bold text-sm shadow-lg">
                  Apply for this Job →
                </button>
              </Link>
            </div>

            {/* Job Overview Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-bold text-[#001e40] uppercase tracking-widest mb-5">
                Job Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-[18px]">work</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Employment Type</p>
                    <p className="text-sm font-semibold text-[#001e40]">{job.employment_type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-[18px]">laptop_mac</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Work Setup</p>
                    <p className="text-sm font-semibold text-[#001e40]">{job.work_setup}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Location</p>
                    <p className="text-sm font-semibold text-[#001e40]">{job.location || 'Remote'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Diposting</p>
                    <p className="text-sm font-semibold text-[#001e40]">{postedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Badge Card */}
            <div className="bg-gradient-to-br from-[#001e40] to-[#003366] rounded-2xl p-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="material-symbols-outlined text-white text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    psychology
                  </span>
                  <p className="text-white font-bold text-sm">AI-Powered Screening</p>
                </div>
                <p className="text-white/60 text-xs leading-relaxed">
                  Lamaran kamu akan otomatis dianalisis oleh AI kami. Pastikan CV kamu relevan dengan posisi ini untuk mendapatkan score terbaik.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-emerald-300 text-xs font-medium">AI Screening Active</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 text-white/5">
                <span className="material-symbols-outlined text-[100px]">smart_toy</span>
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-sm font-bold text-[#001e40] mb-4">Share this position</p>
              <div className="flex gap-3">
                <button
                  onClick={undefined}
                  className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </button>
                <button
                  onClick={undefined}
                  className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">link</span>
                </button>
                <button
                  onClick={undefined}
                  className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Footer */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md px-4 py-4 shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.1)] border-t border-gray-100 z-50">
        <Link href={`/apply?jobId=${jobIdParam}`}>
          <button className="w-full bg-gradient-to-br from-[#001e40] to-[#003366] text-white py-4 rounded-xl font-bold text-sm shadow-lg">
            Apply for this Job →
          </button>
        </Link>
      </div>

    </main>
  );
}