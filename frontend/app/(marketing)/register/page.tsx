import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="relative flex-grow flex items-center justify-center w-full px-4 pt-20 pb-12 min-h-[calc(100vh-72px)] overflow-hidden">
      {/* Background Decorative Elements (Asymmetric Layout) */}
      <div className="fixed top-20 right-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[5%] left-[-5%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-[480px]">
        {/* Center Card */}
        <section className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-[0_12px_32px_-4px_rgba(25,28,29,0.06)] border border-outline-variant/15 w-full">
          <div className="mb-10 text-center md:text-left">
            <h1 className="font-headline text-3xl font-bold text-primary mb-3">Create an Account</h1>
            <p className="text-on-surface-variant font-body text-sm">Join innovative HR teams automating their screening process.</p>
          </div>
          
          <form className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label 
                className="block font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant" 
                htmlFor="full_name"
              >
                Full Name
              </label>
              <input 
                className="w-full px-4 py-3 bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary focus:bg-surface-container-lowest rounded-lg transition-all outline-none text-on-surface text-sm" 
                id="full_name" 
                placeholder="Enter your full name" 
                type="text"
              />
            </div>
            
            {/* Company Field */}
            <div className="space-y-2">
              <label 
                className="block font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant" 
                htmlFor="company"
              >
                Company Name
              </label>
              <input 
                className="w-full px-4 py-3 bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary focus:bg-surface-container-lowest rounded-lg transition-all outline-none text-on-surface text-sm" 
                id="company" 
                placeholder="e.g. Sterling Architecture Ltd." 
                type="text"
              />
            </div>
            
            {/* Email Field */}
            <div className="space-y-2">
              <label 
                className="block font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant" 
                htmlFor="email"
              >
                Work Email
              </label>
              <input 
                className="w-full px-4 py-3 bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary focus:bg-surface-container-lowest rounded-lg transition-all outline-none text-on-surface text-sm" 
                id="email" 
                placeholder="name@company.com" 
                type="email"
              />
            </div>
            
            {/* Password Field Group */}
            <div className="space-y-2">
              <label 
                className="block font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant" 
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary focus:bg-surface-container-lowest rounded-lg transition-all outline-none text-on-surface pr-12 text-sm" 
                  id="password" 
                  placeholder="Min. 8 characters" 
                  type="password"
                />
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors" 
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>visibility</span>
                </button>
              </div>
              
              {/* Strength Indicator */}
              <div className="pt-2 flex gap-1 items-center">
                <div className="h-1 flex-1 rounded-full bg-secondary"></div>
                <div className="h-1 flex-1 rounded-full bg-secondary"></div>
                <div className="h-1 flex-1 rounded-full bg-secondary"></div>
                <div className="h-1 flex-1 rounded-full bg-surface-container-highest"></div>
                <span className="text-[10px] font-semibold text-secondary ml-2 uppercase">Strong</span>
              </div>
            </div>
            
            {/* Consent Checkbox */}
            <div className="flex items-start gap-3 py-2 cursor-pointer group">
              <div className="relative flex items-center pt-0.5">
                <input 
                  className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer" 
                  id="terms" 
                  type="checkbox"
                />
              </div>
              <label className="text-xs text-on-surface-variant leading-relaxed cursor-pointer" htmlFor="terms">
                I agree to the <Link className="text-primary font-semibold hover:underline" href="#">Terms of Service</Link> and <Link className="text-primary font-semibold hover:underline" href="#">Privacy Policy</Link>
              </label>
            </div>
            
            {/* Submit Button */}
            <button 
              className="w-full bg-gradient-to-br from-[#001e40] to-[#003366] text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl hover:opacity-95 transition-all transform active:scale-95" 
              type="submit"
            >
              Create Account
            </button>
          </form>
          
          {/* Footer Link */}
          <div className="mt-10 pt-8 border-t border-outline-variant/15 text-center">
            <p className="text-sm text-on-surface-variant">
              Already have an account? 
              <Link className="text-primary font-bold hover:underline ml-1 cursor-pointer" href="/login">
                Log in
              </Link>
            </p>
          </div>
        </section>
        
        {/* Decorative Trust Badge */}
        <div className="mt-8 flex justify-center items-center gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>verified_user</span>
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>encrypted</span>
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>cloud_done</span>
        </div>
      </div>
    </div>
  );
}
