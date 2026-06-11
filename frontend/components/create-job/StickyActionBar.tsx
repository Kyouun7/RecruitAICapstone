'use client';

interface StickyActionBarProps {
  onCancel: () => void;
  onPublish: () => void;
  isSubmitting?: boolean;
  publishLabel?: string;
}

export default function StickyActionBar({ onCancel, onPublish, isSubmitting = false, publishLabel }: StickyActionBarProps) {
  return (
    <footer className="fixed bottom-0 left-0 lg:left-64 right-0 h-auto bg-white/90 backdrop-blur-xl border-t border-outline-variant/15 px-4 sm:px-8 py-4 flex justify-end items-center gap-3 z-40">
      <button type="button" onClick={onCancel} className="px-4 sm:px-6 py-2.5 text-on-surface-variant font-semibold hover:bg-surface-high rounded-lg transition-colors cursor-pointer text-sm">
        Batal
      </button>
      <button type="button" onClick={onPublish} disabled={isSubmitting}
        className="px-5 sm:px-8 py-2.5 bg-gradient-to-br from-primary to-[#003366cc] text-white font-headline font-bold rounded-lg shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm">
        {isSubmitting ? 'Menyimpan...' : (publishLabel || 'Publikasikan Lowongan')}
      </button>
    </footer>
  );
}