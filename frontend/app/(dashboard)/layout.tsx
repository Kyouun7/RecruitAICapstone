import AdminHeader from "@/components/layout/AdminHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest text-on-surface">
      <AdminHeader />
      <main className="flex-grow bg-background">
        {children}
      </main>
    </div>
  );
}
