'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import HeroSection from "@/components/home/HeroSection";
import LogoCloud from "@/components/home/LogoCloud";
import KeyStats from "@/components/home/KeyStats";
import AboutSection from "@/components/home/AboutSection";
import HowItWorks from "@/components/home/HowItWorks";
import CoreFeatures from "@/components/home/CoreFeatures";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";

export default function Home() {
  // Handle hash scroll saat navigasi dari halaman lain (misal /?#about)
  useEffect(() => {
    const hash = window.location.hash?.replace('#', '');
    if (!hash) return;
    // Tunggu sebentar biar semua section selesai render
    const timer = setTimeout(() => {
      const el = document.querySelector(`#${hash}`);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div id="hero"><HeroSection /></div>
      <LogoCloud />
      <KeyStats />
      <div id="about"><AboutSection /></div>
      <div id="features"><HowItWorks /></div>
      <CoreFeatures />
      <div id="pricing"><PricingSection /></div>
      <div id="faq"><FAQSection /></div>
    </>
  );
}