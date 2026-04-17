import HeroSection from "@/components/home/HeroSection";
import LogoCloud from "@/components/home/LogoCloud";
import HowItWorks from "@/components/home/HowItWorks";
import CoreFeatures from "@/components/home/CoreFeatures";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoCloud />
      <HowItWorks />
      <CoreFeatures />
      <Testimonials />
    </>
  );
}
