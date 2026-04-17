export default function Testimonials() {
  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#003366] skew-x-12 translate-x-1/2 opacity-20"></div>
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <h2 className="text-4xl font-bold mb-16 text-center font-headline">
          Loved by HR Leaders
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Testimonial 1 */}
          <div className="bg-white/5 backdrop-blur-lg p-10 rounded-[2rem] border border-white/10">
            <span
              className="material-symbols-outlined text-5xl text-secondary-fixed mb-6"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              format_quote
            </span>
            <p className="text-xl leading-relaxed italic mb-8">
              "RecruitAI transformed our hiring from a reactive nightmare to a
              strategic advantage. We filled our entire engineering squad in 3
              weeks, something that used to take us 6 months."
            </p>
            <div className="flex items-center gap-4">
              <img
                alt="Sarah Johnson"
                className="w-12 h-12 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7oUC1E6f5Qay090NO5W4SU0-PQdvlgEZSShonKX068oS_ksEZsJBgCT6KGyB1_DCmbAVv9Mj-5M1Bt_bpBJ61PTeua1-R1GtdbTQbppTrEDE1fT5dDqmy5tfCXREpRJMuOy8wt9VxFilnm4U-kvGq30K8H_2kkiyithbd0927srwTSTjTkNu7jLDyQ9jdkb60CzrNLGG-4CzXNleIBO0fOhKEPERHlzDDQX-13AMQkSekIGlg_DYvYFnrR5Z7cFayUDpMA6piVVo3"
              />
              <div>
                <div className="font-bold text-lg font-headline">Sarah Johnson</div>
                <div className="text-sm text-white/60">
                  VP of People, TechFlow
                </div>
              </div>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-white/5 backdrop-blur-lg p-10 rounded-[2rem] border border-white/10">
            <span
              className="material-symbols-outlined text-5xl text-secondary-fixed mb-6"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              format_quote
            </span>
            <p className="text-xl leading-relaxed italic mb-8">
              "The bias reduction is not just a marketing claim—it's visible in
              our dashboard. Our diversity hires have increased by 40% since
              implementing RecruitAI's automated screening."
            </p>
            <div className="flex items-center gap-4">
              <img
                alt="Michael Chen"
                className="w-12 h-12 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8dJmnxGlWtCaYjk1dwdD69BGtuFPRBCjQPoVlOrmz0IV9x9n-nGsEuv_YnkSVpLcJUQzF90YAPeb8inL-yOzHSj_VdppHUdhXPySUNciMwft-duKPxTyW1ysMb-HWHyAmvZxFLelHa3W6XNqP-IFhoTZy16bBEBH_-KIYsSTEmcwC2okyDDjCR7vQwtLVNFVlbDd_5J-b7y4pQw-hjtoRUddpDa1ylntjq1NPJqAiMk_sykuU2nMTaGQ2rFzxi8d0twWYu5MHXast"
              />
              <div>
                <div className="font-bold text-lg font-headline">Michael Chen</div>
                <div className="text-sm text-white/60">
                  Director of Talent, Lumina Systems
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
