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

  if (!job) {
    notFound();
  }

  // Parse responsibilities and qualifications into lists
  const responsibilities = job.key_responsibilities 
    ? job.key_responsibilities.split('\n').filter((item: string) => item.trim() !== '') 
    : [];
    
  const qualifications = job.minimum_qualifications
    ? job.minimum_qualifications.split('\n').filter((item: string) => item.trim() !== '')
    : [];

  const jobIdParam = job.job_id || job.id;

  return (
    <main className="pt-24 pb-20 px-6 max-w-screen-2xl mx-auto">
      {/* Hero Header */}
      <header className="bg-surface-container-lowest rounded-xl p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all shadow-sm">
        <div className="flex items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-xl bg-surface-container-low flex items-center justify-center overflow-hidden shrink-0">
            <span className="material-symbols-outlined text-4xl text-primary">corporate_fare</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary tracking-tight mb-2">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="flex items-center gap-1 text-on-surface-variant font-medium">
                <span className="material-symbols-outlined text-sm">corporate_fare</span>
                RecruitAI Labs
              </span>
              <span className="flex items-center gap-1 text-on-surface-variant font-medium">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {job.location || 'Remote'}
              </span>
              <div className="flex gap-2 ml-2">
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-widest">
                  {job.employment_type || 'Full-time'}
                </span>
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-widest">
                  {job.work_setup || 'Office'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <Link href={`/apply?jobId=${jobIdParam}`}>
            <button className="bg-gradient-to-br from-[#001e40] to-[#003366] text-white px-8 py-4 rounded-xl font-semibold shadow-sm hover:scale-105 transition-transform active:scale-95">
              Apply for this Job
            </button>
          </Link>
        </div>
      </header>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-8 space-y-12">
          <section>
            <h2 className="text-xl font-bold font-headline text-primary mb-6 flex items-center gap-3">
              About the Role
            </h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed font-body whitespace-pre-wrap">
              {job.description}
            </div>
          </section>

          {responsibilities.length > 0 && (
            <section>
              <h2 className="text-xl font-bold font-headline text-primary mb-6">Key Responsibilities</h2>
              <ul className="space-y-4">
                {responsibilities.map((resp: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-on-surface-variant leading-relaxed">
                    <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                    {resp.trim().replace(/^[*-]\s*/, '')}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {qualifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold font-headline text-primary mb-6">Requirements & Qualifications</h2>
              <ul className="space-y-4">
                {qualifications.map((qual: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-on-surface-variant leading-relaxed">
                    <span className="material-symbols-outlined text-primary mt-1">arrow_right</span>
                    {qual.trim().replace(/^[*-]\s*/, '')}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
            <div className="md:hidden mb-6">
              <Link href={`/apply?jobId=${jobIdParam}`}>
                <button className="w-full bg-gradient-to-br from-[#001e40] to-[#003366] text-white py-4 rounded-xl font-semibold active:scale-95 transition-all">
                  Apply Now
                </button>
              </Link>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-surface-container-high last:border-0 last:pb-0">
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Experience</p>
                  <p className="text-lg font-semibold text-primary">3-5 Years</p>
                </div>
                <span className="material-symbols-outlined text-on-primary-container">history_edu</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-surface-container-high last:border-0 last:pb-0">
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Work Level</p>
                  <p className="text-lg font-semibold text-primary">Professional</p>
                </div>
                <span className="material-symbols-outlined text-on-primary-container">trending_up</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-surface-container-high last:border-0 last:pb-0">
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Salary Range</p>
                  <p className="text-lg font-semibold text-primary">Competitive</p>
                </div>
                <span className="material-symbols-outlined text-on-primary-container">payments</span>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-surface-container-high">
              <p className="text-sm font-bold text-primary mb-4">Share this position</p>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <span className="material-symbols-outlined text-[20px]">link</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recruiter Info Block (Extra Editorial Touch) */}
          <div className="bg-primary text-white rounded-xl p-8 overflow-hidden relative group">
            <div className="relative z-10">
              <h4 className="font-headline font-bold text-lg mb-2">Have questions?</h4>
              <p className="text-on-primary-container text-sm leading-relaxed mb-6">Connect directly with our engineering recruitment lead for a confidential chat.</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container-lowest/20 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <p className="font-bold text-sm">Recruitment Team</p>
                  <p className="text-xs text-on-primary-container">Talent Acquisition</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 text-white opacity-5">
              <span className="material-symbols-outlined text-[120px]">smart_toy</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Fixed Footer CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-lowest/95 backdrop-blur-md p-4 shadow-[0_-4px_24px_-4px_rgba(25,28,29,0.08)] z-50">
        <Link href={`/apply?jobId=${jobIdParam}`}>
          <button className="w-full bg-gradient-to-br from-[#001e40] to-[#003366] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg active:scale-[0.98]">
            Apply for this Job
          </button>
        </Link>
      </div>
    </main>
  );
}
