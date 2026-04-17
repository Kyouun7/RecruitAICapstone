import Link from 'next/link';

interface AdminHeaderProps {
  userName: string;
  userRole: string;
  avatarUrl?: string | null;
}

export default function AdminHeader({ userName, userRole, avatarUrl }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-surface-container-lowest border-b border-outline-variant/20 px-8 py-3 flex justify-between items-center h-16">
      {/* Left/Center Space */}
      <div className="flex-1 flex items-center gap-4">
        <Link href="/" className="text-xl font-bold text-primary font-headline tracking-tight">
          RecruitAI
        </Link>
        {/* Placeholder for Breadcrumbs or Page Title */}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        {/* Icons */}
        <div className="flex items-center gap-4 text-on-surface-variant">
          <button className="hover:text-primary hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
          </button>
          <button className="hover:text-primary hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>help</span>
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="h-8 w-[1px] bg-outline-variant/30 hidden sm:block"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-bold text-on-surface font-label group-hover:text-primary transition-colors leading-tight">
              {userName}
            </span>
            <span className="text-xs font-medium text-on-surface-variant opacity-80 font-label leading-tight">
              {userRole}
            </span>
          </div>
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant/20 flex-shrink-0">
            {avatarUrl ? (
              <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="font-bold text-primary font-headline">
                {userName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
