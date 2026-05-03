'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { icon: 'settings', label: 'Settings', href: '/dashboard/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-white border-r border-gray-100 flex flex-col p-4 space-y-2">
      {/* Branding */}
      <div className="px-3 py-4 mb-4">
        <h2 className="font-headline font-bold text-primary text-lg">
          RecruitAI Admin
        </h2>
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
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-150
                ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-slate-600 hover:bg-gray-50 hover:text-primary'
                }
              `}
            >
              <span className="material-symbols-outlined text-[20px]">
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Post a Job CTA */}
      <div className="p-2 mt-auto">
        <Link
          href="/dashboard/create"
          className="w-full block text-center bg-gradient-to-br from-primary to-[#003366cc] text-white py-3 rounded-lg font-headline font-semibold active:scale-95 duration-150 shadow-sm hover:shadow-md transition-all"
        >
          + Post a Job
        </Link>
      </div>
    </aside>
  );
}