'use client';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
}

export default function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-semibold text-primary">{label}</h4>
        <p className="text-xs text-on-surface-variant">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div
          className="
            w-11 h-6 bg-slate-300 rounded-full
            peer peer-checked:bg-secondary
            peer-focus:outline-none
            after:content-[''] after:absolute after:top-[2px] after:start-[2px]
            after:bg-white after:border-gray-300 after:border after:rounded-full
            after:h-5 after:w-5 after:transition-all
            peer-checked:after:translate-x-full
            rtl:peer-checked:after:-translate-x-full
            peer-checked:after:border-white
            transition-colors duration-200
          "
        />
      </label>
    </div>
  );
}
