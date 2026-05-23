export default function KeyStats() {
  const stats = [
    {
      value: '≥ 50%',
      label: 'Lebih Cepat dari Screening Manual',
      icon: 'speed',
    },
    {
      value: '≤ 30 Detik',
      label: 'Waktu Pemrosesan per Dokumen CV',
      icon: 'timer',
    },
    {
      value: '≥ 80%',
      label: 'Akurasi Klasifikasi Kesesuaian Kandidat',
      icon: 'verified',
    },
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center px-8 py-6 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-1">
                <span
                  className="material-symbols-outlined text-white text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {stat.icon}
                </span>
              </div>
              <div className="text-5xl font-black text-white font-headline tracking-tight">
                {stat.value}
              </div>
              <p className="text-sm font-medium text-white/70 max-w-[160px] leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}