import Link from 'next/link';

export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: 'Gratis',
      period: '/ bulan',
      desc: 'Untuk tim kecil yang baru memulai otomatisasi rekrutmen.',
      features: [
        'Hingga 3 lowongan aktif',
        'Screening AI hingga 50 CV/bulan',
        'Dashboard kandidat dasar',
        'Notifikasi email otomatis',
      ],
      cta: 'Mulai Gratis',
      href: '/register',
      highlighted: false,
    },
    {
      name: 'Growth',
      price: 'Rp 299.000',
      period: '/ bulan',
      desc: 'Untuk tim HR yang membutuhkan kapasitas lebih besar.',
      features: [
        'Hingga 15 lowongan aktif',
        'Screening AI hingga 300 CV/bulan',
        'Dashboard kandidat lengkap + leaderboard',
        'Konfigurasi threshold skor per lowongan',
        'Dukungan email prioritas',
      ],
      cta: 'Mulai Sekarang',
      href: '/register',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Hubungi Kami',
      period: '',
      desc: 'Untuk organisasi besar dengan kebutuhan volume tinggi.',
      features: [
        'Lowongan dan CV tidak terbatas',
        'Integrasi API kustom',
        'Onboarding & pelatihan tim HR',
        'SLA dan dukungan dedikasi',
        'Laporan performa rekrutmen berkala',
      ],
      cta: 'Hubungi Kami',
      href: '/register',
      highlighted: false,
    },
  ];

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 font-headline">Harga &amp; Paket</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            Pilih paket yang sesuai kebutuhan tim HR Anda. Mulai gratis, upgrade kapan saja.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-3xl border p-10 shadow-sm transition-shadow hover:shadow-md
                ${plan.highlighted
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-on-surface border-outline-variant/20'
                }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow">
                    Paling Populer
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-lg font-bold mb-1 font-headline ${plan.highlighted ? 'text-white/80' : 'text-on-surface-variant'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-4xl font-black font-headline ${plan.highlighted ? 'text-white' : 'text-primary'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm font-medium mb-1 ${plan.highlighted ? 'text-white/60' : 'text-on-surface-variant'}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm leading-relaxed ${plan.highlighted ? 'text-white/70' : 'text-on-surface-variant'}`}>
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-3 flex-1 mb-10">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <span
                      className={`material-symbols-outlined text-base mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-white/80' : 'text-primary'}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className={plan.highlighted ? 'text-white/90' : 'text-on-surface-variant'}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <button
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95
                    ${plan.highlighted
                      ? 'bg-white text-primary hover:bg-white/90 shadow-lg'
                      : 'bg-gradient-to-br from-[#001e40] to-[#003366] text-white hover:shadow-lg'
                    }`}
                >
                  {plan.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}