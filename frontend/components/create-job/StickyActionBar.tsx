'use client';

interface StickyActionBarProps {
  onCancel: () => void;
  onPublish: () => void;
  isSubmitting?: boolean;
  publishLabel?: string;
}

export default function StickyActionBar({ onCancel, onPublish, isSubmitting = false, publishLabel }: StickyActionBarProps) {
  return (
    <footer className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white border-t border-gray-100 px-4 sm:px-8 py-3 flex justify-end items-center gap-3 z-40">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 sm:px-5 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors border border-outline-variant/30"
      >
        Batal
      </button>
      <button
        type="button"
        onClick={onPublish}
        disabled={isSubmitting}
        className="px-5 sm:px-7 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Menyimpan...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
            {publishLabel || 'Simpan Perubahan'}
          </>
        )}
      </button>
    </footer>
  );
}
