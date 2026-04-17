import MinimalHeader from "@/components/layout/MinimalHeader";

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <MinimalHeader />
      <main className="flex-grow pt-[72px]">
        {children}
      </main>
    </div>
  );
}
