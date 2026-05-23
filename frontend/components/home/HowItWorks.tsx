export default function HowItWorks() {
  const steps = [
    {
      icon: 'settings_input_component',
      step: 'Langkah 01',
      title: 'Atur Parameter AI',
      desc: 'Masukkan kualifikasi, atur skor threshold, lalu AI akan mempelajari profil kandidat ideal Anda.',
    },
    {
      icon: 'share',
      step: 'Langkah 02',
      title: 'Bagikan Tautan Pelamaran',
      desc: 'Bagikan portal lamaran ke ATS atau posting pekerjaan Anda. Kandidat hanya perlu mengisi formulir singkat dan mengunggah CV dalam format PDF.',
    },
    {
      icon: 'psychology',
      step: 'Langkah 03',
      title: 'Biarkan AI Bekerja',
      desc: 'RecruitAI otomatis mengekstrak, mengevaluasi, dan meranking kandidat berdasarkan Job Description. Hasil tersedia dalam hitungan detik.',
    },
  ];

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 font-headline">Cara Kerja RecruitAI</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            Seluruh alur kerja penyaringan teknis Anda, diotomatiskan dalam tiga langkah sederhana.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-surface-container-lowest p-10 rounded-3xl shadow-sm border border-outline-variant/10 group hover:bg-surface-container-high transition-colors"
            >
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">{s.icon}</span>
              </div>
              <div className="text-xs font-bold text-on-primary-container mb-2 uppercase tracking-widest">
                {s.step}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 leading-tight font-headline">
                {s.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}