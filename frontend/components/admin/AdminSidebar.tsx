'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: 'dashboard', label: 'Dasbor', href: '/dashboard' },
  { icon: 'settings', label: 'Pengaturan', href: '/dashboard/settings' },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-white border-r border-gray-100
        flex flex-col p-4 space-y-2 z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
    >
      {/* Close button - mobile only */}
      <button
        className="lg:hidden absolute top-3 right-3 p-1.5 rounded-lg hover:bg-gray-100 text-on-surface-variant"
        onClick={onClose}
      >
        <span className="material-symbols-outlined text-[20px]">close</span>
      </button>

      {/* Branding */}
      <div className="px-3 py-4 mb-4">
        <h2 className="font-headline font-bold text-primary text-lg">RecruitAI Admin</h2>
        <p className="text-xs text-on-surface-variant">Enterprise Suite</p>
      </div>

      {/* Navigation */}
      <div className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive =
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-150
                ${isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-slate-600 hover:bg-gray-50 hover:text-primary'
                }
              `}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Post a Job CTA */}
      <div className="p-2 mt-auto">
        <Link
          href="/dashboard/create"
          onClick={onClose}
          className="w-full block text-center bg-gradient-to-br from-primary to-[#003366cc] text-white py-3 rounded-lg font-headline font-semibold active:scale-95 duration-150 shadow-sm hover:shadow-md transition-all"
        >
          + Buat Lowongan
        </Link>
      </div>
    </aside>
  );
}
