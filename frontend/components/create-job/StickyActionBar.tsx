'use client';

interface StickyActionBarProps {
  onCancel: () => void;
  onPublish: () => void;
  isSubmitting?: boolean;
}

export default function StickyActionBar({
  onCancel,
  onPublish,
  isSubmitting = false,
}: StickyActionBarProps) {
  return (
    <footer className="fixed bottom-0 left-64 right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-outline-variant/15 px-8 flex justify-end items-center gap-4 z-40">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2.5 text-on-surface-variant font-semibold hover:bg-surface-high rounded-lg transition-colors cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onPublish}
        disabled={isSubmitting}
        className="
          px-8 py-2.5 bg-gradient-to-br from-primary to-[#003366cc]
          text-white font-headline font-bold rounded-lg shadow-md
          active:scale-95 transition-all cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {isSubmitting ? 'Publishing...' : 'Publish Job'}
      </button>
    </footer>
  );
}
