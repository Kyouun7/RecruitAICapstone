'use client';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
  icon?: string;
  iconColor?: string;
}

export default function ToggleSwitch({ checked, onChange, label, description, icon, iconColor = 'text-primary' }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-start gap-3 min-w-0">
        {icon && (
          <span className={`material-symbols-outlined text-[18px] mt-0.5 flex-shrink-0 ${iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-on-surface leading-tight">{label}</h4>
          <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
        <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white transition-colors duration-200" />
      </label>
    </div>
  );
}
