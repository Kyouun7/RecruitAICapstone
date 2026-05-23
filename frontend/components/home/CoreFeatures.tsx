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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 font-headline">Fitur Unggulan</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            Dirancang untuk mengatasi kelelahan rekruter modern dengan tiga kemampuan inti.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-surface-container-low rounded-3xl p-10 border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-14 h-14 bg-secondary-container text-on-secondary-container rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {f.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4 font-headline leading-tight">
                {f.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}