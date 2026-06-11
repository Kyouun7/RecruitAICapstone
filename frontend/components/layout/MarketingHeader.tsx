'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import api from '@/lib/axios';

export default function MarketingHeader() {
  const [user, setUser] = useState<{ full_name: string } | null>(null);
  const [checked, setChecked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setChecked(true); return; }
    setChecked(true);
    api.get('/api/auth/me')
      .then((res) => { if (res.data.success) setUser(res.data.data); })
      .catch(() => {
        localStorage.removeItem('token');
        document.cookie = 'token=; path=/; max-age=0';
        setUser(null);
      });
  }, []);

  // Tutup menu saat navigasi
  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; max-age=0';
    window.location.href = '/';
  };

  const navLinks = [
    { label: 'About',   hash: 'about' },
    { label: 'Product', hash: 'features' },
    { label: 'Pricing', hash: 'pricing' },
    { label: 'FAQ',     hash: 'faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    setMobileMenuOpen(false);
    if (isLandingPage) {
      e.preventDefault();
      const el = document.querySelector(`#${hash}`);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const initial = user?.full_name ? user.full_name.charAt(0).toUpperCase() : '';

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-sm border-b border-outline-variant/20 h-16">
        <div className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 h-full">

          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (isLandingPage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="text-xl font-bold text-primary font-headline tracking-tight cursor-pointer z-10"
          >
            RecruitAI
          </Link>

          {/* Nav links - desktop only */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={isLandingPage ? `#${link.hash}` : `/?#${link.hash}`}
                onClick={(e) => handleNavClick(e, link.hash)}
                className="text-on-surface-variant hover:text-primary transition-colors font-semibold text-sm font-label cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth area + hamburger */}
          <div className="z-10 flex items-center gap-3">
            {/* Auth buttons - desktop */}
            <div className="hidden md:flex items-center gap-4">
              {!checked ? (
                <div className="w-24 h-9 bg-surface-container-high rounded-lg animate-pulse" />
              ) : user ? (
                <>
                  <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-container-low transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {initial}
                    </div>
                    <span className="text-sm font-semibold text-on-surface hidden lg:block">{user.full_name}</span>
                  </Link>
                  <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold text-error hover:bg-red-50 rounded-lg transition-colors">
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-5 py-2 text-sm font-semibold text-primary hover:bg-surface-container-low rounded-lg transition-all active:scale-95 font-label">
                    Masuk
                  </Link>
                  <Link href="/register" className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-br from-[#001e40] to-[#003366] rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 font-label">
                    Daftar
                  </Link>
                </>
              )}
            </div>

            {/* Mobile: tampilkan tombol login/daftar langsung + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              {checked && !user && (
                <Link href="/login" className="px-3 py-1.5 text-xs font-semibold text-primary border border-primary/30 rounded-lg">
                  Masuk
                </Link>
              )}
              {checked && !user && (
                <Link href="/register" className="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-br from-[#001e40] to-[#003366] rounded-lg">
                  Daftar
                </Link>
              )}
              {checked && user && (
                <Link href="/dashboard" className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                  {initial}
                </Link>
              )}
              {/* Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-surface-container-low transition-colors"
                aria-label="Menu"
              >
                <span className="material-symbols-outlined text-on-surface">
                  {mobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-outline-variant/20 shadow-lg md:hidden">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={isLandingPage ? `#${link.hash}` : `/?#${link.hash}`}
                onClick={(e) => handleNavClick(e, link.hash)}
                className="block px-4 py-3 text-sm font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            {user && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-error hover:bg-red-50 rounded-xl transition-colors"
              >
                Keluar
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
