'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrorMsg(''); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMsg('Email dan password wajib diisi');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/api/auth/login', formData);
      const { token } = response.data;
      
      // Simpan token ke localStorage
      if (token) {
        localStorage.setItem('token', token);
      }
      
      // Redirect ke dashboard
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else if (error.response?.data?.errors) {
        setErrorMsg(error.response.data.errors.join(', '));
      } else {
        setErrorMsg('Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center w-full px-4 pt-20 pb-12 min-h-[calc(100vh-72px)]">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-xl p-10 border border-outline-variant/15 shadow-sm">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-on-surface mb-2 tracking-tight font-headline">Welcome Back</h2>
            <p className="text-on-surface-variant font-body text-sm">Log in to manage your recruitment pipeline.</p>
          </div>
          
          {errorMsg && (
            <div className="mb-6 p-3 bg-error-container text-on-error-container text-sm rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-sm">error</span>
              {errorMsg}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label 
                className="block text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider" 
                htmlFor="email"
              >
                Work Email
              </label>
              <input 
                className="w-full px-4 py-3 bg-surface-container-low rounded-lg border-none focus:ring-1 focus:ring-secondary focus:bg-surface-container-lowest transition-all font-body text-sm text-on-surface placeholder:text-outline-variant" 
                id="email" 
                name="email" 
                placeholder="name@company.com" 
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label 
                  className="block text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider" 
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low rounded-lg border-none focus:ring-1 focus:ring-secondary focus:bg-surface-container-lowest transition-all font-body text-sm text-on-surface pr-12" 
                  id="password" 
                  name="password" 
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" 
                  type="button"
                  tabIndex={-1}
                >
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                    visibility
                  </span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 bg-transparent cursor-pointer" 
                  type="checkbox"
                />
                <span className="text-on-surface-variant font-body text-sm group-hover:text-on-surface transition-colors">
                  Remember me
                </span>
              </label>
              <a className="text-primary font-semibold font-body text-sm hover:underline decoration-secondary transition-all" href="#">
                Forgot password?
              </a>
            </div>
            
            <button 
              className="w-full bg-gradient-to-br from-[#001e40] to-[#003366] text-white font-semibold py-4 rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all text-center flex justify-center items-center gap-2 disabled:opacity-70 disabled:active:scale-100" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Logging in...
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>
          
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-container-high"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface-container-lowest px-4 text-outline font-label tracking-widest">
                Or continue with
              </span>
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-surface-container-lowest border border-outline-variant/15 rounded-lg text-on-surface font-body font-semibold text-sm hover:bg-surface-container-low active:scale-95 transition-all">
            <img 
              alt="Google Logo" 
              className="w-5 h-5" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATBu_sRLWuJJRC2CqigQpLfqBg3-uwJ_f1x3SoRSj3RK99h9r4c3bz3PEZcUXXjOZ1I-Lb4GoMipgrM4oAKC9FH_u2cBJ83L5WldLnM0cqGsoTrD6WZ8UsM6_hYiin2caiD3DfTgAxGnRckmCqPx0O_4OXtAlMZqeNDHGgaeO6gWOHNv7w38AsafJJm5HYdNvF9weH63XfylEFXWJNoEAoPM6Ku1nTDGeaNcrlKjwgf1RY28HMfIbhKkYRkjLHJDiZBgQDQNx5lqPm" 
            />
            <span>Google</span>
          </button>
          
          <p className="mt-8 text-center text-on-surface-variant font-body text-sm">
            Don't have an account? 
            <Link className="text-primary font-bold hover:underline decoration-secondary transition-all ml-1" href="/register">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
