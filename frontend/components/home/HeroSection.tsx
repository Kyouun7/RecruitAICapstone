import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT: Text */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-wide uppercase">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            Penyaringan AI Generasi Terbaru
          </div>
          <h1 className="text-6xl font-extrabold text-primary leading-[1.1] tracking-tight font-headline">
            Percepat Kerja HR Anda <br />
            <span className="text-on-primary-container">hingga 40%.</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
            RecruitAI membantu tim HR melakukan penyaringan kandidat secara otomatis dan terstruktur berbasis AI. Lebih cepat, lebih konsisten, tanpa mengorbankan kualitas.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/register">
              <button className="px-8 py-4 text-base font-bold text-white bg-gradient-to-br from-[#001e40] to-[#003366] rounded-xl shadow-xl hover:shadow-2xl transition-all active:scale-90">
                Mulai Uji Coba Gratis
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT: Visual */}
        <div className="relative mt-8 lg:mt-0">
          <div className="bg-surface-container-low rounded-3xl p-4 shadow-sm border border-outline-variant/10">
            <img
              alt="Tim HR bekerja menggunakan RecruitAI"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
            />

            {/* Floating Card 1: Ekstraksi CV Otomatis */}
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-5 rounded-2xl shadow-xl max-w-[210px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                <span className="font-bold text-xs uppercase tracking-tight">Ekstraksi CV Otomatis</span>
              </div>
              <div className="text-3xl font-black font-headline">30 Detik</div>
              <div className="text-xs font-medium opacity-75 mt-1">Waktu pemrosesan per dokumen CV</div>
            </div>

            {/* Floating Card 2: Status Screening */}
            <div className="absolute -top-4 -right-4 bg-white border border-outline-variant/20 text-on-surface p-4 rounded-2xl shadow-lg flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>manage_search</span>
              </div>
              <div>
                <div className="text-xs font-bold text-primary">Status Screening</div>
                <div className="text-xs text-on-surface-variant">24 CV diproses otomatis</div>
              </div>
            </div>

            {/* Floating Card 3: Akurasi Klasifikasi */}
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 bg-white border border-outline-variant/20 text-on-surface p-4 rounded-2xl shadow-lg flex items-center gap-3 max-w-[200px]">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-on-secondary-container text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <div>
                <div className="text-xs font-bold text-primary">Akurasi Klasifikasi</div>
                <div className="text-xs text-on-surface-variant">Target akurasi minimal 80%</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}