'use client';

import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <AdminSidebar />
      <main className="ml-64 flex-1 px-8 py-8 flex flex-col bg-gray-50">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">{children}</div>
      </main>
    </div>
  );
}