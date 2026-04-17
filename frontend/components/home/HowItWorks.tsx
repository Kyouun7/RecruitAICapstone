export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 font-headline">
            Sophisticated Simplicity
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            Your entire technical screening workflow, automated in three steps.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-surface-container-lowest p-10 rounded-3xl shadow-sm border border-outline-variant/10 group hover:bg-surface-container-high transition-colors">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">
                settings_input_component
              </span>
            </div>
            <div className="text-xs font-bold text-on-primary-container mb-2 uppercase tracking-widest">
              Step 01
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4 leading-tight font-headline">
              Set AI Parameters
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Define core competencies, cultural values, and technical
              requirements. Our AI learns your "ideal hire" DNA.
            </p>
          </div>
          {/* Step 2 */}
          <div className="bg-surface-container-lowest p-10 rounded-3xl shadow-sm border border-outline-variant/10 group hover:bg-surface-container-high transition-colors">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">share</span>
            </div>
            <div className="text-xs font-bold text-on-primary-container mb-2 uppercase tracking-widest">
              Step 02
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4 leading-tight font-headline">
              Share Custom Link
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Inject our AI-first application portal into your ATS or job posts.
              Candidates experience a 2-minute conversation.
            </p>
          </div>
          {/* Step 3 */}
          <div className="bg-surface-container-lowest p-10 rounded-3xl shadow-sm border border-outline-variant/10 group hover:bg-surface-container-high transition-colors">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">
                psychology
              </span>
            </div>
            <div className="text-xs font-bold text-on-primary-container mb-2 uppercase tracking-widest">
              Step 03
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4 leading-tight font-headline">
              Let AI Screen 24/7
            </h3>
            <h4 className="hidden font-headline">Step 3 Details</h4>
            <p className="text-on-surface-variant leading-relaxed">
              Relax as RecruitAI ranks candidates, generates interview guides, and
              flags the highest quality talent instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
