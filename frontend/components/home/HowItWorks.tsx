export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 font-headline">Sederhana Namun Canggih</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            Seluruh alur kerja penyaringan teknis Anda, diotomatiskan dalam tiga langkah.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-surface-container-lowest p-10 rounded-3xl shadow-sm border border-outline-variant/10 group hover:bg-surface-container-high transition-colors">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">settings_input_component</span>
            </div>
            <div className="text-xs font-bold text-on-primary-container mb-2 uppercase tracking-widest">Langkah 01</div>
            <h3 className="text-2xl font-bold text-primary mb-4 leading-tight font-headline">Atur Parameter AI</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Tentukan kompetensi utama, nilai budaya, dan persyaratan teknis. AI kami mempelajari kriteria "kandidat ideal" Anda.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-10 rounded-3xl shadow-sm border border-outline-variant/10 group hover:bg-surface-container-high transition-colors">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">share</span>
            </div>
            <div className="text-xs font-bold text-on-primary-container mb-2 uppercase tracking-widest">Langkah 02</div>
            <h3 className="text-2xl font-bold text-primary mb-4 leading-tight font-headline">Bagikan Tautan Lowongan</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Sematkan portal lamaran berbasis AI ke postingan lowongan Anda. Kandidat dapat melamar dengan mudah dalam hitungan menit.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-10 rounded-3xl shadow-sm border border-outline-variant/10 group hover:bg-surface-container-high transition-colors">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>
            <div className="text-xs font-bold text-on-primary-container mb-2 uppercase tracking-widest">Langkah 03</div>
            <h3 className="text-2xl font-bold text-primary mb-4 leading-tight font-headline">Biarkan AI Bekerja 24/7</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Santai saja sementara RecruitAI meranking kandidat dan menandai talenta berkualitas tinggi secara otomatis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}