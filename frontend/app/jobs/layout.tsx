import MinimalHeader from '@/components/layout/MinimalHeader';

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background min-h-screen">
      <MinimalHeader />
      {children}
    </div>
  );
}
