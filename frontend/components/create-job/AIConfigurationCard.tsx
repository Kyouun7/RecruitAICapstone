'use client';

import ToggleSwitch from './ToggleSwitch';

interface AIConfigurationCardProps {
  aiMatchScore: number;
  autoEmailQualified: boolean;
  autoEmailRegret: boolean;
  onScoreChange: (value: number) => void;
  onToggleQualified: () => void;
  onToggleRegret: () => void;
}

export default function AIConfigurationCard({ aiMatchScore, autoEmailQualified, autoEmailRegret, onScoreChange, onToggleQualified, onToggleRegret }: AIConfigurationCardProps) {
  return (
    <section className="bg-primary/5 border border-primary/10 rounded-xl p-8 shadow-[0_12px_32px_-4px_rgba(25,28,29,0.06)] relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
      </div>
      <h2 className="text-xl font-headline font-bold text-primary mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined">psychology</span>
        Konfigurasi Kecerdasan AI
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-xs font-semibold text-primary uppercase tracking-wider">Skor Kecocokan AI Minimum</label>
            <span className="text-2xl font-headline font-extrabold text-primary">{aiMatchScore}%</span>
          </div>
          <input type="range" min={0} max={100} value={aiMatchScore} onChange={(e) => onScoreChange(Number(e.target.value))}
            className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"/>
          <p className="mt-4 text-sm text-on-surface-variant italic">
            Hanya kandidat yang skornya di atas ambang batas ini yang akan otomatis masuk daftar review Anda.
          </p>
        </div>
        <div className="space-y-6">
          <ToggleSwitch checked={autoEmailQualified} onChange={onToggleQualified}
            label="Email Otomatis: Lolos Seleksi"
            description="Beritahu kandidat segera saat mereka masuk shortlist."/>
          <ToggleSwitch checked={autoEmailRegret} onChange={onToggleRegret}
            label="Email Otomatis: Tidak Lolos"
            description="Kirim pemberitahuan sopan kepada kandidat dengan skor rendah."/>
        </div>
      </div>
    </section>
  );
}