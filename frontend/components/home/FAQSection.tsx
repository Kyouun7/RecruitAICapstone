'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Seberapa akurat AI RecruitAI dalam menilai kesesuaian kandidat?',
    a: 'Sistem dirancang dengan target akurasi klasifikasi minimal 80% berdasarkan evaluasi model. AI menganalisis CV secara kontekstual dan mencocokkannya secara dinamis dengan Job Description spesifik tiap lowongan, bukan sekadar pencocokan kata kunci sederhana.',
  },
  {
    q: 'Apakah data kandidat aman dan sesuai regulasi privasi?',
    a: 'Seluruh data kandidat disimpan dalam sistem database yang aman. Akses hanya diberikan kepada tim HR yang berwenang. Kami berkomitmen pada praktik pengelolaan data yang bertanggung jawab.',
  },
  {
    q: 'Format dokumen apa yang didukung untuk unggah CV?',
    a: 'Pada tahap MVP, sistem mendukung dokumen CV dalam format PDF berbasis teks. Format lain seperti Word, gambar, atau PDF hasil scan belum didukung untuk menjaga akurasi ekstraksi dan kecepatan pemrosesan.',
  },
  {
    q: 'Berapa lama waktu yang dibutuhkan untuk setup awal?',
    a: 'Setup awal sangat cepat. Rekruter cukup membuat akun, mengisi detail lowongan dan Job Description, mengatur threshold skor, lalu membagikan tautan portal pelamaran. Seluruh proses dapat selesai dalam hitungan menit.',
  },
  {
    q: 'Apakah tersedia masa uji coba gratis?',
    a: 'Ya. Paket Starter tersedia gratis tanpa batas waktu untuk penggunaan dasar dengan kapasitas hingga 3 lowongan aktif dan 50 CV per bulan, cukup untuk mencoba dan merasakan manfaat RecruitAI sebelum berlangganan paket berbayar.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3 md:mb-4 font-headline">Pertanyaan Umum</h2>
          <p className="text-on-surface-variant text-base sm:text-lg">
            Jawaban atas pertanyaan yang paling sering diajukan calon pengguna RecruitAI.
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'border-primary/30 bg-surface-container-low shadow-sm'
                    : 'border-outline-variant/20 bg-white hover:border-primary/20'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-3 px-5 md:px-6 py-4 md:py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-semibold text-on-surface text-sm leading-snug pr-2">
                    {faq.q}
                  </span>
                  <span
                    className={`material-symbols-outlined flex-shrink-0 text-primary transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 md:px-6 pb-4 md:pb-5">
                    <p className="text-on-surface-variant text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
