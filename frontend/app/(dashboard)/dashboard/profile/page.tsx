'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import api from '@/lib/axios';

interface User {
  user_id: string;
  full_name: string;
  email: string;
  company_name: string;
  role: string;
  created_at: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ full_name: '', company_name: '' });

  // Password state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Show/hide password toggles
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get('/api/auth/me');
        if (res.data.success) {
          setUser(res.data.data);
          setFormData({
            full_name: res.data.data.full_name,
            company_name: res.data.data.company_name,
          });
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  const getInitials = (name: string) =>
    name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric',
    });

  const handleSaveProfile = async () => {
    if (!formData.full_name.trim()) return;
    setIsSaving(true);
    try {
      const res = await api.put('/api/auth/profile', {
        full_name: formData.full_name.trim(),
        company_name: formData.company_name.trim(),
      });
      if (res.data.success) {
        setUser((prev) => prev ? { ...prev, ...formData } : prev);
        setSaveSuccess(true);
        setIsEditing(false);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err: any) {
      console.error('Failed to save:', err);
      alert(err.response?.data?.message || 'Gagal menyimpan profil. Coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    if (!passwordData.current_password || !passwordData.new_password || !passwordData.confirm_password) {
      setPasswordError('Semua field harus diisi.');
      return;
    }
    if (passwordData.new_password.length < 8) {
      setPasswordError('Password baru minimal 8 karakter.');
      return;
    }
    if (passwordData.new_password !== passwordData.confirm_password) {
      setPasswordError('Konfirmasi password tidak cocok.');
      return;
    }
    setIsSavingPassword(true);
    try {
      await api.put('/api/auth/change-password', {
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
      });
      setPasswordSuccess(true);
      setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
      setShowPasswordForm(false);
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: any) {
      setPasswordError(err.response?.data?.message || 'Gagal mengubah password. Coba lagi.');
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <AdminLayout>
      <div className="pt-2 max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-headline font-bold text-on-surface mb-1">My Profile</h2>
          <p className="text-sm text-on-surface-variant">Kelola informasi akun dan keamanan HR Anda.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-5">

          {/* Top banner */}
          <div className="h-24 bg-gradient-to-br from-primary to-[#003366]" />

          {/* Avatar + Info */}
          <div className="px-6 pb-6">
            <div className="flex items-start justify-between mb-5">
              <div className="-mt-10">
                {isLoading ? (
                  <div className="w-20 h-20 rounded-full bg-surface-container-high border-4 border-white animate-pulse" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-primary/10 border-4 border-white flex items-center justify-center shadow-sm">
                    <span className="text-2xl font-black text-primary">
                      {user ? getInitials(user.full_name) : '?'}
                    </span>
                  </div>
                )}
              </div>
              {!isLoading && (
                <div className="flex gap-2 mt-3 flex-wrap justify-end">
                  {saveSuccess && (
                    <span className="flex items-center gap-1 text-xs font-medium text-[#006c4d] bg-[#f0fdf4] px-3 py-1.5 rounded-full border border-[#006c4d]/20">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Tersimpan
                    </span>
                  )}
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => { setIsEditing(false); setFormData({ full_name: user?.full_name || '', company_name: user?.company_name || '' }); }}
                        className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg text-on-surface-variant hover:bg-gray-50 transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="px-4 py-1.5 text-sm bg-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-1.5"
                      >
                        {isSaving ? (
                          <span className="material-symbols-outlined text-[14px] animate-spin">autorenew</span>
                        ) : (
                          <span className="material-symbols-outlined text-[14px]">save</span>
                        )}
                        Simpan
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-1.5 px-4 py-1.5 text-sm border border-gray-200 rounded-lg text-on-surface-variant hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      Edit Profil
                    </button>
                  )}
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="space-y-2">
                <div className="h-6 bg-surface-container-high rounded w-48 animate-pulse" />
                <div className="h-4 bg-surface-container-high rounded w-32 animate-pulse" />
              </div>
            ) : (
              <>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1.5">Nama Lengkap</label>
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData((p) => ({ ...p, full_name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="Nama lengkap"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1.5">Nama Perusahaan</label>
                      <input
                        type="text"
                        value={formData.company_name}
                        onChange={(e) => setFormData((p) => ({ ...p, company_name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="Nama perusahaan"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-on-surface">{user?.full_name}</h3>
                    <p className="text-sm text-on-surface-variant mt-0.5">{user?.company_name}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
                        {user?.role === 'hr' ? 'HR Manager' : user?.role}
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Info Detail */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-5">
          <h4 className="text-sm font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">person</span>
            Informasi Akun
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Email', value: user?.email, icon: 'mail' },
              { label: 'Role', value: user?.role === 'hr' ? 'HR Manager' : user?.role, icon: 'badge' },
              { label: 'Perusahaan', value: user?.company_name, icon: 'business' },
              { label: 'Bergabung Sejak', value: user?.created_at ? formatDate(user.created_at) : '-', icon: 'calendar_today' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{icon}</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-0.5">{label}</p>
                  {isLoading ? (
                    <div className="h-4 bg-surface-container-high rounded w-32 animate-pulse" />
                  ) : (
                    <p className="text-sm font-semibold text-on-surface">{value || '-'}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keamanan / Ganti Password */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">lock</span>
              Keamanan
            </h4>
            {passwordSuccess && (
              <span className="flex items-center gap-1 text-xs font-medium text-[#006c4d] bg-[#f0fdf4] px-3 py-1 rounded-full border border-[#006c4d]/20">
                <span className="material-symbols-outlined text-[13px]">check_circle</span>
                Password berhasil diubah
              </span>
            )}
          </div>

          {!showPasswordForm ? (
            <div className="flex items-center justify-between py-3 px-4 bg-surface-container-low rounded-xl">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">key</span>
                <div>
                  <p className="text-sm font-semibold text-on-surface">Password</p>
                  <p className="text-xs text-on-surface-variant">••••••••</p>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordForm(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 text-sm border border-gray-200 rounded-lg text-on-surface-variant hover:bg-white hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">edit</span>
                Ubah Password
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Current Password */}
              {[
                { label: 'Password Saat Ini', key: 'current_password', show: showCurrent, toggle: () => setShowCurrent(p => !p) },
                { label: 'Password Baru', key: 'new_password', show: showNew, toggle: () => setShowNew(p => !p) },
                { label: 'Konfirmasi Password Baru', key: 'confirm_password', show: showConfirm, toggle: () => setShowConfirm(p => !p) },
              ].map(({ label, key, show, toggle }) => (
                <div key={key}>
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1.5">{label}</label>
                  <div className="relative">
                    <input
                      type={show ? 'text' : 'password'}
                      value={passwordData[key as keyof typeof passwordData]}
                      onChange={(e) => setPasswordData((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[18px]">{show ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>
              ))}

              {passwordError && (
                <p className="text-xs text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  {passwordError}
                </p>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => { setShowPasswordForm(false); setPasswordError(''); setPasswordData({ current_password: '', new_password: '', confirm_password: '' }); }}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg text-on-surface-variant hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleChangePassword}
                  disabled={isSavingPassword}
                  className="flex-1 px-4 py-2.5 text-sm bg-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-1.5 font-semibold"
                >
                  {isSavingPassword ? (
                    <span className="material-symbols-outlined text-[14px] animate-spin">autorenew</span>
                  ) : (
                    <span className="material-symbols-outlined text-[14px]">lock_reset</span>
                  )}
                  Simpan Password
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}