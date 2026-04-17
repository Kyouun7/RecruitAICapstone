export default function CoreFeatures() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <img
              alt="Human-Centric AI"
              className="rounded-[2rem] shadow-2xl w-full h-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtE5pH4h2qmAcOZU-QHSFfeKCkXvnKpo97j3lVGvrKT8OtHZI0Mm3LGHlBD1m767vWl_F768UgqEQNNWhuXxUTU3rge1aKvmy4kZ66iTneDGLr2tJLeoxt4cbpElvKwPggAa1Ev9DPgcXQ1fk7vMnmmRFMj6w_CmrqIMxyoqnGuaGgPjlZwv9ygugy2LfZRtX1gm1aOj2MyQWJODK1AXfoiJ-Nxwwxw8UgWZM5oHOTktDZofwOmLG7knYcItnGu5e_AJwahz7XhtGj"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-10">
            <h2 className="text-4xl font-bold text-primary leading-tight font-headline">
              Engineered to solve the modern recruiter's exhaustion.
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2 font-headline">
                    Unbiased Talent Discovery
                  </h4>
                  <p className="text-on-surface-variant">
                    Our AI ignores names, schools, and gender to focus purely on
                    skills and potential—delivering a diverse candidate pool every
                    time.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    timer
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2 font-headline">
                    Zero-Second Response
                  </h4>
                  <p className="text-on-surface-variant">
                    Engage every applicant immediately. No more "resume black
                    holes." Candidates get instant feedback while you get instant
                    rankings.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    troubleshoot
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2 font-headline">
                    Deep Skill Analysis
                  </h4>
                  <p className="text-on-surface-variant">
                    Beyond keywords. RecruitAI analyzes semantic context in
                    portfolios and project descriptions to understand true
                    proficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
