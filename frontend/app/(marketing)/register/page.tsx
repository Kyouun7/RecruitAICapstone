'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ full_name: '', company_name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { setErrorMsg('Anda harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi.'); return; }
    if (!formData.full_name || !formData.company_name || !formData.email || !formData.password) {
      setErrorMsg('Semua kolom wajib diisi'); return;
    }
    setIsLoading(true);
    try {
      const response = await api.post('/api/auth/register', formData);
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      }
      router.push('/dashboard');
    } catch (error: any) {
      if (error.response?.data?.message) setErrorMsg(error.response.data.message);
      else if (error.response?.data?.errors) setErrorMsg(error.response.data.errors.join(', '));
      else setErrorMsg('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (p: string): { level: number; label: string; color: string } => {
    if (p.length === 0) return { level: 0, label: '', color: '' };
    let score = 0;
    if (p.length >= 8) score++;
    if (p.length >= 12) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return { level: 1, label: 'Lemah', color: '#ba1a1a' };
    if (score <= 2) return { level: 2, label: 'Cukup', color: '#e67e22' };
    if (score <= 3) return { level: 3, label: 'Baik', color: '#2980b9' };
    return { level: 4, label: 'Kuat', color: '#006c4d' };
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-6 min-h-[calc(100vh-72px)]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10">

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-on-surface mb-1.5 tracking-tight">
              Buat Akun
            </h1>
            <p className="text-sm text-on-surface-variant">
              Bergabung dengan tim HR yang mengotomatiskan proses rekrutmen mereka.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 bg-error-container text-on-error-container text-sm rounded-lg flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
              </svg>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="full_name" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Nama Lengkap</label>
              <input id="full_name" name="full_name" type="text" placeholder="Masukkan nama lengkap Anda" value={formData.full_name} onChange={handleChange} required className="w-full px-4 py-3 bg-[#f3f4f5] rounded-lg text-sm text-on-surface placeholder:text-outline-variant border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all"/>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="company_name" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Nama Perusahaan</label>
              <input id="company_name" name="company_name" type="text" placeholder="contoh: PT. Jalin Mayantara Indonesia" value={formData.company_name} onChange={handleChange} required className="w-full px-4 py-3 bg-[#f3f4f5] rounded-lg text-sm text-on-surface placeholder:text-outline-variant border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all"/>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Email Kerja</label>
              <input id="email" name="email" type="email" placeholder="nama@perusahaan.com" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-[#f3f4f5] rounded-lg text-sm text-on-surface placeholder:text-outline-variant border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all"/>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Kata Sandi</label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Min. 8 karakter" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 bg-[#f3f4f5] rounded-lg text-sm text-on-surface placeholder:text-outline-variant border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all pr-11"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" tabIndex={-1}>
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" x2="23" y1="1" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {formData.password.length > 0 && (
                <div className="pt-1 flex gap-1 items-center">
                  {[1, 2, 3, 4].map((bar) => (
                    <div key={bar} className="h-1 flex-1 rounded-full transition-all duration-300" style={{ background: strength.level >= bar ? strength.color : '#e1e3e4' }}/>
                  ))}
                  <span className="text-[10px] font-bold uppercase ml-2 transition-all duration-300" style={{ color: strength.color }}>{strength.label}</span>
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 cursor-pointer" onClick={() => { setAgreed(!agreed); setErrorMsg(''); }}>
              <div className={`w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${agreed ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                {agreed && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2 6 5 9 10 3"/>
                  </svg>
                )}
              </div>
              <span className="text-sm text-on-surface-variant leading-relaxed select-none">
                Saya menyetujui{' '}
                <a href="#" onClick={e => e.stopPropagation()} className="font-semibold text-on-surface hover:underline">Syarat & Ketentuan</a>
                {' '}dan{' '}
                <a href="#" onClick={e => e.stopPropagation()} className="font-semibold text-on-surface hover:underline">Kebijakan Privasi</a>
              </span>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-br from-[#001e40] to-[#003366] text-white font-semibold py-3.5 rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70">
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  Membuat Akun...
                </>
              ) : 'Buat Akun'}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-on-surface-variant">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-bold text-primary hover:underline">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
}