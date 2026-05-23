'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function MarketingHeader() {
  const [user, setUser] = useState<{ full_name: string } | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setChecked(true); return; }
    api.get('/api/auth/me')
      .then((res) => { if (res.data.success) setUser(res.data.data); })
      .catch(() => {})
      .finally(() => setChecked(true));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; max-age=0';
    window.location.href = '/';
  };

  const navLinks = [
    { label: 'About',   href: '#about' },
    { label: 'Product', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ',     href: '#faq' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const navbarHeight = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const initial = user?.full_name ? user.full_name.charAt(0).toUpperCase() : '';

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-sm border-b border-outline-variant/20 h-16">
      <div className="relative max-w-7xl mx-auto flex items-center justify-between px-8 h-full">

        {/* Logo - kiri */}
        <a
          href="#hero"
          onClick={(e) => handleScroll(e, '#hero')}
          className="text-xl font-bold text-primary font-headline tracking-tight cursor-pointer z-10"
        >
          RecruitAI
        </a>

        {/* Nav links - absolut tengah */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-on-surface-variant hover:text-primary transition-colors font-semibold text-sm font-label cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth area - kanan */}
        <div className="z-10">
          {!checked ? (
            <div className="w-24 h-9 bg-surface-container-high rounded-lg animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-container-low transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {initial}
                </div>
                <span className="text-sm font-semibold text-on-surface hidden lg:block">
                  {user.full_name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-error hover:bg-red-50 rounded-lg transition-colors"
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="hidden lg:block px-5 py-2 text-sm font-semibold text-primary hover:bg-surface-container-low rounded-lg transition-all active:scale-95 font-label"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-br from-[#001e40] to-[#003366] rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 font-label"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}