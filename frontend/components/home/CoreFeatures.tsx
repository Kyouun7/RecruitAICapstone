export default function CoreFeatures() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <img
              alt="AI yang Berpusat pada Manusia"
              className="rounded-[2rem] shadow-2xl w-full h-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtE5pH4h2qmAcOZU-QHSFfeKCkXvnKpo97j3lVGvrKT8OtHZI0Mm3LGHlBD1m767vWl_F768UgqEQNNWhuXxUTU3rge1aKvmy4kZ66iTneDGLr2tJLeoxt4cbpElvKwPggAa1Ev9DPgcXQ1fk7vMnmmRFMj6w_CmrqIMxyoqnGuaGgPjlZwv9ygugy2LfZRtX1gm1aOj2MyQWJODK1AXfoiJ-Nxwwxw8UgWZM5oHOTktDZofwOmLG7knYcItnGu5e_AJwahz7XhtGj"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-10">
            <h2 className="text-4xl font-bold text-primary leading-tight font-headline">
              Dirancang untuk mengatasi kelelahan rekruter modern.
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2 font-headline">Penemuan Talenta Tanpa Bias</h4>
                  <p className="text-on-surface-variant">
                    AI kami mengabaikan nama, asal universitas, dan gender untuk fokus pada kemampuan dan potensi, menghasilkan kumpulan kandidat yang beragam.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2 font-headline">Respons Instan</h4>
                  <p className="text-on-surface-variant">
                    Libatkan setiap pelamar secara langsung. Tidak ada lagi CV yang menumpuk tanpa tindakan. Kandidat mendapat umpan balik cepat, Anda mendapat peringkat instan.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>troubleshoot</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2 font-headline">Analisis Keahlian Mendalam</h4>
                  <p className="text-on-surface-variant">
                    Lebih dari sekadar kata kunci. RecruitAI menganalisis konteks semantik dalam portofolio dan deskripsi proyek untuk memahami kemampuan yang sesungguhnya.
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