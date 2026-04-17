import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-auto py-12 px-6 md:px-8 bg-slate-50">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="font-[family-name:var(--font-manrope)] font-bold text-primary">
          RecruitAI
        </div>
        <p className="text-sm text-slate-500 text-center">
          © {new Date().getFullYear()} RecruitAI. Built for the Digital Curator.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="#" className="text-slate-500 hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-slate-500 hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="#" className="text-slate-500 hover:text-primary transition-colors">Cookie Settings</Link>
          <Link href="#" className="text-slate-500 hover:text-primary transition-colors">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
