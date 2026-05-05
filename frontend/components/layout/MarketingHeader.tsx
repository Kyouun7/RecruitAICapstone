import Link from 'next/link';

export default function MarketingHeader() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-sm border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        <Link href="/" className="text-xl font-bold text-primary font-headline tracking-tight">RecruitAI</Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/solutions" className="text-on-surface-variant hover:text-primary transition-colors font-semibold text-sm font-label">Solusi</Link>
          <Link href="/pricing" className="text-on-surface-variant hover:text-primary transition-colors font-semibold text-sm font-label">Harga</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden lg:block px-5 py-2 text-sm font-semibold text-primary hover:bg-surface-container-low rounded-lg transition-all active:scale-95 font-label">
            Masuk
          </Link>
          <Link href="/register" className="px-6 py-2.5 text-sm font-bold text-on-primary bg-gradient-to-br from-[#001e40] to-[#003366] rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 font-label">
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}