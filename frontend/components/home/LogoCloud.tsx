export default function LogoCloud() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-[0.2em] mb-10">
          Trusted by innovative HR teams at:
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="h-8 w-32 bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg')] bg-no-repeat bg-contain bg-center"></div>
          <div className="h-8 w-32 bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg')] bg-no-repeat bg-contain bg-center"></div>
          <div className="h-8 w-32 bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg')] bg-no-repeat bg-contain bg-center"></div>
          <div className="h-8 w-32 bg-[url('https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg')] bg-no-repeat bg-contain bg-center"></div>
          <div className="h-8 w-32 bg-[url('https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg')] bg-no-repeat bg-contain bg-center"></div>
        </div>
      </div>
    </section>
  );
}
