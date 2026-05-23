export default function CoreFeatures() {
  const features = [
    {
      icon: 'balance',
      title: 'Penemuan Kandidat Tanpa Bias',
      desc: 'Sistem AI berfokus pada kualifikasi dan keterampilan nyata kandidat, tanpa dipengaruhi faktor subjektif. Hasilnya rekomendasi yang lebih adil dan konsisten.',
    },
    {
      icon: 'mark_email_read',
      title: 'Respons Instan ke Pelamar',
      desc: 'Setiap pelamar mendapat notifikasi otomatis berdasarkan skor evaluasi AI. Tidak ada lagi kandidat yang menunggu tanpa kepastian.',
    },
    {
      icon: 'document_scanner',
      title: 'Analisis CV Mendalam',
      desc: 'AI mengekstraksi dan menganalisis pendidikan, pengalaman kerja, dan keterampilan kandidat secara kontekstual, bukan sekadar pencocokan kata kunci.',
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-wide uppercase mb-4">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            Fitur Unggulan
          </div>
          <h2 className="text-4xl font-bold text-primary leading-tight font-headline">
            Dirancang untuk mengatasi kelelahan rekruter modern.
          </h2>
        </div>

        {/* Side by side */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Dashboard mockup */}
          <div className="relative">
            <div className="bg-surface-container-low rounded-3xl p-4 border border-outline-variant/10 shadow-xl">
              {/* Browser bar mockup */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl mb-3 border border-outline-variant/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-surface-container-low rounded-lg h-6 mx-4 flex items-center px-3">
                  <span className="text-xs text-on-surface-variant">recruitai.app/dashboard</span>
                </div>
              </div>

              {/* Dashboard UI mockup */}
              <div className="bg-white rounded-2xl p-5 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="h-4 w-32 bg-primary/20 rounded-md mb-1" />
                    <div className="h-3 w-20 bg-surface-container-high rounded-md" />
                  </div>
                  <div className="px-4 py-2 bg-primary rounded-lg">
                    <div className="h-3 w-16 bg-white/60 rounded" />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {['bg-primary/10', 'bg-secondary-container/60', 'bg-surface-container-high'].map((bg, i) => (
                    <div key={i} className={`${bg} rounded-xl p-4`}>
                      <div className="h-6 w-12 bg-primary/30 rounded mb-2" />
                      <div className="h-2.5 w-16 bg-surface-container-highest rounded" />
                    </div>
                  ))}
                </div>

                {/* Candidate list */}
                <div className="space-y-2.5">
                  {[92, 85, 78, 71].map((score, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/10">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="h-3 w-28 bg-surface-container-highest rounded mb-1.5" />
                        <div className="h-2 w-20 bg-surface-container-high rounded" />
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${score >= 80 ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'}`}>
                        {score}%
                      </div>
                      <div className={`w-2 h-2 rounded-full ${score >= 80 ? 'bg-green-400' : 'bg-slate-300'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-primary text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-bold">
              kandidat diranking otomatis
            </div>
          </div>

          {/* RIGHT: Feature list */}
          <div className="space-y-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-5 bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span
                    className="material-symbols-outlined text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {f.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary mb-1 font-headline">{f.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}