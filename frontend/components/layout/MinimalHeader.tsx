import Link from 'next/link';

export default function MinimalHeader() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center">
        <Link href="/" className="text-xl font-bold text-primary font-headline tracking-tight">
          RecruitAI
        </Link>
      </div>
    </nav>
  );
}
