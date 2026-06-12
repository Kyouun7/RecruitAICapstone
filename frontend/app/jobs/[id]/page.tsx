import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getJob(id: string) {
  const apiUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/jobs/${id}`, { cache: 'no-store' });
  if (!res.ok) { if (res.status === 404) return null; throw new Error('Gagal mengambil data lowongan'); }
  const data = await res.json();
  return data.data;
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const job = await getJob(resolvedParams.id);
  if (!job) notFound();

  const responsibilities = job.key_responsibilities ? job.key_responsibilities.split('\n').filter((item: string) => item.trim() !== '') : [];
  const qualifications = job.minimum_qualifications ? job.minimum_qualifications.split('\n').filter((item: string) => item.trim() !== '') : [];
  const jobIdParam = job.job_id || job.id;
  const postedDate = new Date(job.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      <div className="bg-gradient-to-br from-[#001e40] via-[#002a5c] to-[#003366] pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <span className="material-symbols-outlined text-3xl text-white/80">corporate_fare</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1.5 text-white/70 text-sm"><span className="material-symbols-outlined text-[16px]">location_on</span>{job.location || 'Remote'}</span>
                  <span className="text-white/30 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5 text-white/70 text-sm"><span className="material-symbols-outlined text-[16px]">work</span>{job.employment_type}</span>
                  <span className="text-white/30 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5 text-white/70 text-sm"><span className="material-symbols-outlined text-[16px]">laptop_mac</span>{job.work_setup}</span>
                  <span className="text-white/30 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5 text-white/70 text-sm"><span className="material-symbols-outlined text-[16px]">calendar_today</span>Diposting {postedDate}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-full uppercase tracking-wider backdrop-blur-sm">{job.employment_type}</span>
                  <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-full uppercase tracking-wider backdrop-blur-sm">{job.work_setup}</span>
                  {job.is_active ? (
                    <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold rounded-full uppercase tracking-wider">● Buka</span>
                  ) : (
                    <span className="px-3 py-1 bg-red-500/20 border border-red-400/40 text-red-300 text-xs font-semibold rounded-full uppercase tracking-wider">Tutup</span>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden md:block flex-shrink-0">
              <Link href={`/apply?jobId=${jobIdParam}`}>
                <button className="bg-white text-[#001e40] px-8 py-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Lamar Posisi Ini →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><span className="material-symbols-outlined text-primary text-[20px]">description</span></div>
                <h2 className="text-lg font-bold text-[#001e40]">Tentang Posisi Ini</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed text-sm whitespace-pre-line">{job.description}</p>
            </div>

            {responsibilities.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center"><span className="material-symbols-outlined text-emerald-600 text-[20px]">checklist</span></div>
                  <h2 className="text-lg font-bold text-[#001e40]">Tanggung Jawab Utama</h2>
                </div>
                <ul className="space-y-3">
                  {responsibilities.map((resp: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed">
                      <span className="material-symbols-outlined text-emerald-500 text-[18px] mt-0.5 flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span>{resp.trim().replace(/^[-•*]\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {qualifications.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><span className="material-symbols-outlined text-primary text-[20px]">school</span></div>
                  <h2 className="text-lg font-bold text-[#001e40]">Persyaratan &amp; Kualifikasi</h2>
                </div>
                <ul className="space-y-3">
                  {qualifications.map((qual: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 flex-shrink-0">arrow_right</span>
                      <span>{qual.trim().replace(/^[-•*]\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-gradient-to-br from-[#001e40] to-[#003366] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-white font-bold text-lg mb-1">Tertarik dengan posisi ini?</p>
                <p className="text-white/60 text-sm">Kirimkan CV kamu sekarang dan biarkan AI kami menilai kecocokanmu.</p>
              </div>
              <Link href={`/apply?jobId=${jobIdParam}`}>
                <button className="flex-shrink-0 bg-white text-[#001e40] px-7 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap">
                  Lamar Sekarang →
                </button>
              </Link>
            </div>
          </div>

          <div className="space-y-5 lg:sticky lg:top-24">
            <div className="md:hidden">
              <Link href={`/apply?jobId=${jobIdParam}`}>
                <button className="w-full bg-gradient-to-br from-[#001e40] to-[#003366] text-white py-4 rounded-xl font-bold text-sm shadow-lg">Lamar Posisi Ini →</button>
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-bold text-[#001e40] uppercase tracking-widest mb-5">Ringkasan Lowongan</h3>
              <div className="space-y-4">
                {[
                  { icon: 'work', label: 'Tipe Pekerjaan', value: job.employment_type },
                  { icon: 'laptop_mac', label: 'Sistem Kerja', value: job.work_setup },
                  { icon: 'location_on', label: 'Lokasi', value: job.location || 'Remote' },
                  { icon: 'calendar_today', label: 'Diposting', value: postedDate },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-[18px]">{icon}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{label}</p>
                      <p className="text-sm font-semibold text-[#001e40]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#001e40] to-[#003366] rounded-2xl p-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  <p className="text-white font-bold text-sm">Penyaringan Berbasis AI</p>
                </div>
                <p className="text-white/60 text-xs leading-relaxed">Lamaran kamu akan otomatis dianalisis oleh AI kami. Pastikan CV kamu relevan dengan posisi ini untuk mendapatkan skor terbaik.</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
                  <p className="text-emerald-300 text-xs font-medium">Penyaringan AI Aktif</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 text-white/5">
                <span className="material-symbols-outlined text-[100px]">smart_toy</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-sm font-bold text-[#001e40] mb-4">Bagikan lowongan ini</p>
              <div className="flex gap-3">
                {['share', 'link', 'mail'].map((icon) => (
                  <button key={icon} className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary transition-all">
                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md px-4 py-4 shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.1)] border-t border-gray-100 z-50">
        <Link href={`/apply?jobId=${jobIdParam}`}>
          <button className="w-full bg-gradient-to-br from-[#001e40] to-[#003366] text-white py-4 rounded-xl font-bold text-sm shadow-lg">Lamar Posisi Ini →</button>
        </Link>
      </div>
    </main>
  );
}
