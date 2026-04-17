import MarketingHeader from "@/components/layout/MarketingHeader";
import Footer from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <MarketingHeader />
      <main className="flex-grow pt-[72px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
