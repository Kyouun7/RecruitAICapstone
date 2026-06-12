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

function ScoreLabel({ score }: { score: number }) {
  if (score >= 85) return <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Ketat</span>;
  if (score >= 70) return <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Standar</span>;
  return <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Longgar</span>;
}

export default function AIConfigurationCard({ aiMatchScore, autoEmailQualified, autoEmailRegret, onScoreChange, onToggleQualified, onToggleRegret }: AIConfigurationCardProps) {
  return (
    <section className="space-y-6">
      {/* Card header */}
      <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/15">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
        </div>
        <div>
          <h2 className="text-base font-bold text-on-surface">Konfigurasi AI</h2>
          <p className="text-xs text-on-surface-variant">Atur parameter penyaringan kandidat otomatis.</p>
        </div>
      </div>

      {/* Threshold Score */}
      <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/15">
        <div className="flex items-start justify-between mb-4 gap-3">
          <div>
            <h3 className="text-sm font-bold text-on-surface mb-0.5">Skor Kecocokan Minimum</h3>
            <p className="text-xs text-on-surface-variant">Kandidat dengan skor di bawah ini otomatis tidak lolos.</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-3xl font-black text-primary font-headline tabular-nums">{aiMatchScore}</span>
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs text-on-surface-variant">/ 100</span>
              <ScoreLabel score={aiMatchScore} />
            </div>
          </div>
        </div>

        {/* Slider */}
        <input
          type="range" min={0} max={100} step={5}
          value={aiMatchScore}
          onChange={(e) => onScoreChange(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary bg-primary/15"
        />

        {/* Scale labels */}
        <div className="flex justify-between text-[10px] text-on-surface-variant mt-2 font-medium">
          <span>0 · Semua lolos</span>
          <span>50 · Sedang</span>
          <span>100 · Sangat ketat</span>
        </div>

        {/* Indicator bar */}
        <div className="mt-4 flex gap-1.5">
          {[...Array(10)].map((_, i) => {
            const barVal = (i + 1) * 10;
            return (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all ${barVal <= aiMatchScore ? 'bg-primary' : 'bg-surface-container-highest'}`}
              />
            );
          })}
        </div>
      </div>

      {/* Email Automation */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-on-surface">Notifikasi Email Otomatis</h3>
        <div className="space-y-2">
          <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/15">
            <ToggleSwitch
              checked={autoEmailQualified}
              onChange={onToggleQualified}
              label="Email Lolos Seleksi"
              description="Kandidat yang skornya memenuhi threshold mendapat email notifikasi otomatis."
              icon="mark_email_read"
              iconColor="text-emerald-600"
            />
          </div>
          <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/15">
            <ToggleSwitch
              checked={autoEmailRegret}
              onChange={onToggleRegret}
              label="Email Tidak Lolos"
              description="Kandidat yang tidak memenuhi threshold mendapat pemberitahuan sopan."
              icon="mail"
              iconColor="text-on-surface-variant"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>summarize</span>
        <div className="text-xs text-primary/80 leading-relaxed space-y-1">
          <p className="font-bold text-primary">Ringkasan Konfigurasi AI</p>
          <p>Hanya kandidat dengan skor ≥ <strong>{aiMatchScore}</strong> yang masuk daftar review.</p>
          <p>Email otomatis lolos: <strong>{autoEmailQualified ? 'Aktif' : 'Nonaktif'}</strong> · Email tidak lolos: <strong>{autoEmailRegret ? 'Aktif' : 'Nonaktif'}</strong></p>
        </div>
      </div>
    </section>
  );
}
