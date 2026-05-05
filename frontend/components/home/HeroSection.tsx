export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-wide uppercase">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            Penyaringan AI Generasi Terbaru
          </div>
          <h1 className="text-6xl font-extrabold text-primary leading-[1.1] tracking-tight font-headline">
            Rekrut talenta terbaik <br />
            <span className="text-on-primary-container">10x lebih cepat.</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
            RecruitAI mengotomatiskan penyaringan kandidat dengan presisi tinggi.
            Kurangi waktu rekrutmen hingga 80% sekaligus menghilangkan bias dari pipeline Anda.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-4 text-base font-bold text-white bg-gradient-to-br from-[#001e40] to-[#003366] rounded-xl shadow-xl hover:shadow-2xl transition-all active:scale-90">
              Mulai Gratis
            </button>
            <button className="px-8 py-4 text-base font-bold text-primary bg-surface-container-high rounded-xl hover:bg-surface-container-highest transition-all active:scale-90">
              Lihat Demo
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="bg-surface-container-low rounded-3xl p-4 shadow-sm border border-outline-variant/10">
            <img
              alt="Pratinjau Dashboard"
              className="rounded-2xl shadow-2xl w-full h-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO4xv27b_T4tGzyC33f0BJrJwOcBA0_0UUDt8YzpNujvr9VqhGoW-MDIgDQj3VRNdb5JDHvySjUuO5LK5TQ8bDAhKAnWJoWyN47-NPt0SbZ6ptv4V2modqV9pCokQjI0QLgsoVThqCtNFMeiDmqXg9uqXPpsPe4cFQhzd_uT_Ae-kNKbAvsA7HdM4oHszKcpOpjYkeTLYRD-qHpCemPUOYiVz_rTdHKqM2Wq0uOsRwIx7MV0cMeHXhn7ewYU-U9nP2DaN081LorhbK"
            />
            <div className="absolute -bottom-6 -left-6 bg-secondary-container text-on-secondary-container p-6 rounded-2xl shadow-xl max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="font-bold text-sm uppercase tracking-tighter">Skor Kecocokan AI</span>
              </div>
              <div className="text-4xl font-black font-headline">98%</div>
              <div className="text-xs font-medium opacity-80 mt-1">Sangat direkomendasikan untuk Posisi Senior Engineering</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}