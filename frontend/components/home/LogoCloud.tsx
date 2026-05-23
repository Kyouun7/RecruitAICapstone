export default function LogoCloud() {
  const logos = [
    { name: 'Kemendikbud', src: '/logos/kemendikbud.png' },
    { name: 'Universitas Brawijaya', src: '/logos/ub.png' },
    { name: 'FILKOM UB', src: '/logos/filkom.png' },
    { name: 'Jalin Bergerak', src: '/logos/jalin.png' },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-8 text-center mb-10">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-[0.2em]">
          Dipercaya oleh tim HR inovatif di berbagai perusahaan
        </p>
      </div>
      <div className="flex justify-center items-center gap-20 flex-wrap px-8">
        {logos.map((logo, i) => (
          <div key={i} className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
            <img
              src={logo.src}
              alt={logo.name}
              className="h-16 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}