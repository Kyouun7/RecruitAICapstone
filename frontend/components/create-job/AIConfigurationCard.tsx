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

export default function AIConfigurationCard({
  aiMatchScore,
  autoEmailQualified,
  autoEmailRegret,
  onScoreChange,
  onToggleQualified,
  onToggleRegret,
}: AIConfigurationCardProps) {
  return (
    <section className="bg-primary/5 border border-primary/10 rounded-xl p-8 shadow-[0_12px_32px_-4px_rgba(25,28,29,0.06)] relative overflow-hidden">
      {/* Decorative background icon */}
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <span
          className="material-symbols-outlined text-8xl"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          auto_awesome
        </span>
      </div>

      <h2 className="text-xl font-headline font-bold text-primary mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined">psychology</span>
        AI Intelligence Configuration
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Range Slider */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-xs font-semibold text-primary uppercase tracking-wider">
              Minimum AI Match Score
            </label>
            <span className="text-2xl font-headline font-extrabold text-primary">
              {aiMatchScore}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={aiMatchScore}
            onChange={(e) => onScoreChange(Number(e.target.value))}
            className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <p className="mt-4 text-sm text-on-surface-variant italic">
            Only candidates scoring above this threshold will be automatically
            shortlisted for your review.
          </p>
        </div>

        {/* Right: Toggle Switches */}
        <div className="space-y-6">
          <ToggleSwitch
            checked={autoEmailQualified}
            onChange={onToggleQualified}
            label="Auto-Email: Qualified"
            description="Notify candidates immediately when shortlisted."
          />
          <ToggleSwitch
            checked={autoEmailRegret}
            onChange={onToggleRegret}
            label="Auto-Email: Regret"
            description="Send a polite rejection to low-match scores."
          />
        </div>
      </div>
    </section>
  );
}
