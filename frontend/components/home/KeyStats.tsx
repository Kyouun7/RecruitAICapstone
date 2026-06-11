export default function KeyStats() {
  const stats = [
    { value: '≥ 50%', label: 'Lebih Cepat dari Screening Manual' },
    { value: '≤ 30 Detik', label: 'Waktu Pemrosesan per Dokumen CV' },
    { value: '≥ 80%', label: 'Akurasi Klasifikasi Kesesuaian Kandidat' },
  ];

  return (
    <section className="py-12 md:py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center px-6 py-8 sm:py-6 gap-2">
              <div className="text-4xl sm:text-5xl font-black text-white font-headline tracking-tight">
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
