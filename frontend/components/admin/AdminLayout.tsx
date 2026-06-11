'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-64px)]" style={{ background: '#f0f2f5' }}>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 lg:ml-64 px-4 sm:px-6 lg:px-8 py-6 lg:py-8 flex flex-col bg-white">
        {/* Hamburger button - mobile only */}
        <button
          className="lg:hidden mb-4 p-2 rounded-lg bg-surface-container-low border border-outline-variant/20 text-on-surface self-start"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">{children}</div>
      </main>
    </div>
  );
}
