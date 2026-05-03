'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function AdminHeader() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [user, setUser] = useState<{
    full_name: string;
    role: string;
    email: string;
  } | null>(null);

  // Ambil data user yang login
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/auth/me');
        if (response.data && response.data.success) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        // Jika unauthorized, bisa diarahkan ke login
        // router.push('/login');
      }
    };
    fetchUser();
  }, []);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const displayRole = user?.role === 'hr' ? 'HR Manager' : (user?.role || 'Admin');
  const initial = user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U';

  return (
    <>
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 px-8 py-3 flex justify-between items-center h-16">
      {/* Left/Center Space */}
      <div className="flex-1 flex items-center gap-4">
        <Link href="/" className="text-xl font-bold text-primary font-headline tracking-tight">
          RecruitAI
        </Link>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        {/* Icons */}
        <div className="flex items-center gap-4 text-on-surface-variant">
          <button className="hover:text-primary hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center relative">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="h-8 w-[1px] bg-outline-variant/30 hidden sm:block"></div>

        {/* User Profile */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-bold text-on-surface font-label group-hover:text-primary transition-colors leading-tight">
              {user?.full_name || 'Loading...'}
            </span>
            <span className="text-xs font-medium text-on-surface-variant opacity-80 font-label leading-tight capitalize">
              {displayRole}
            </span>
          </div>
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center overflow-hidden flex-shrink-0">
            <span className="font-bold font-headline text-lg">
              {initial}
            </span>
          </div>
        </div>

        {/* Profile Dropdown Popup */}
        {isDropdownOpen && (
          <div className="absolute top-12 right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-bold text-on-surface truncate">{user?.full_name || 'User'}</p>
              <p className="text-xs text-on-surface-variant truncate">{user?.email || 'email@example.com'}</p>
            </div>
            
            <div className="py-1">
              <Link
                href="/dashboard/settings"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface hover:bg-gray-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                My Profile
              </Link>
            </div>

            <div className="border-t border-gray-100 py-1 mt-1">
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-red-50 transition-colors text-left"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setShowLogoutModal(false)}
          />
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center flex-shrink-0">
                <span
                  className="material-symbols-outlined text-error text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  logout
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface">Keluar dari RecruitAI?</h3>
                <p className="text-sm text-on-surface-variant">Sesi kamu akan diakhiri.</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-sm font-bold flex-shrink-0">
                {initial}
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">{user?.full_name}</p>
                <p className="text-xs text-on-surface-variant">{user?.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-on-surface text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="flex-1 px-4 py-2.5 rounded-xl bg-error text-white text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}