import HeroSection from "@/components/home/HeroSection";
import LogoCloud from "@/components/home/LogoCloud";
import KeyStats from "@/components/home/KeyStats";
import AboutSection from "@/components/home/AboutSection";
import HowItWorks from "@/components/home/HowItWorks";
import CoreFeatures from "@/components/home/CoreFeatures";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";

export default function Home() {
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