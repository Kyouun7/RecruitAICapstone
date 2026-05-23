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
      <HeroSection />
      <LogoCloud />
      <KeyStats />
      <AboutSection />
      <HowItWorks />
      <CoreFeatures />
      <PricingSection />
      <FAQSection />
    </>
  );
}