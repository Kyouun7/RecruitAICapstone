import React from 'react';
import { AlertIcon } from './icons';

interface FormInputProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helpText?: string;
  autoComplete?: string;
  /** Renders a prefix element inside the input (e.g., icon or country code) */
  prefix?: React.ReactNode;
  /** Quick-fill suggestion chips below the input */
  suggestions?: { label: string; onSelect: () => void }[];
}

export default function FormInput({
  id,
  name,
  type = 'text',
  label,
  required = false,
  optional = false,
  placeholder,
  value,
  onChange,
  error,
  helpText,
  autoComplete,
  prefix,
  suggestions,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-on-surface"
      >
        {label}
        {required && <span className="text-error ml-1">*</span>}
        {optional && <span className="text-outline-variant font-normal ml-1">(Optional)</span>}
      </label>

      <div className="relative group">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
            {prefix}
          </span>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`
            w-full bg-surface-low border-none rounded-lg py-4 px-4
            text-on-surface transition-all
            placeholder:text-outline
            focus-primary
            ${prefix ? 'pl-12' : ''}
            ${error ? 'ring-2 ring-error' : ''}
          `}
        />
      </div>

      {/* Suggestion chips */}
      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={s.onSelect}
              className="text-xs bg-surface-high px-2 py-1 rounded-md hover:bg-surface-highest transition-colors cursor-pointer"
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {helpText && !error && (
        <p className="text-xs text-on-surface-variant">{helpText}</p>
      )}

      {error && (
        <span className="text-xs text-error flex items-center gap-1">
          <AlertIcon /> {error}
        </span>
      )}
    </div>
  );
}
