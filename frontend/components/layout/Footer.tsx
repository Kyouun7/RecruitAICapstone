import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-auto py-10 px-4 sm:px-6 md:px-8 bg-slate-50">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 max-w-7xl mx-auto">
        <div className="font-[family-name:var(--font-manrope)] font-bold text-primary text-lg">RecruitAI</div>
        <p className="text-sm text-slate-500 text-center order-last md:order-none">
          © {new Date().getFullYear()} RecruitAI. Hak cipta dilindungi.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
          <Link href="#" className="text-slate-500 hover:text-primary transition-colors">Kebijakan Privasi</Link>
          <Link href="#" className="text-slate-500 hover:text-primary transition-colors">Syarat & Ketentuan</Link>
          <Link href="#" className="text-slate-500 hover:text-primary transition-colors">Pengaturan Cookie</Link>
          <Link href="#" className="text-slate-500 hover:text-primary transition-colors">Aksesibilitas</Link>
        </div>
      </div>
    </footer>
  );
}
