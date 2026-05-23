export default function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-wide uppercase">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              info
            </span>
            Tentang RecruitAI
          </div>
          <h2 className="text-4xl font-bold text-primary leading-tight font-headline">
            Rekrutmen yang lebih cerdas, dimulai dari sini.
          </h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            RecruitAI adalah sebuah{' '}
            <span className="font-semibold text-primary">
              Intelligent Applicant Triage System (IATS)
            </span>{' '}
            berbasis AI yang dirancang untuk membantu tim HR melakukan penyaringan awal dokumen
            Curriculum Vitae secara otomatis dan terstruktur.
          </p>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Dalam proses rekrutmen modern, satu lowongan pekerjaan dapat menerima ratusan lamaran
            kandidat. Volume yang tinggi ini menciptakan bottleneck pada tahap awal rekrutmen,
            memperpanjang siklus hingga rata-rata{' '}
            <span className="font-semibold text-primary">43 hari</span> sejak pembukaan
            lowongan hingga penandatanganan kontrak. RecruitAI hadir untuk memutus siklus itu.
          </p>
        </div>
      </div>
    </section>
  );
}