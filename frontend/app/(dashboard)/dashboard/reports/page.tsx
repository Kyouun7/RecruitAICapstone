import AdminLayout from '@/components/admin/AdminLayout';
export default function ReportsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">bar_chart</span>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Reports</h2>
        <p className="text-on-surface-variant text-sm">Halaman ini akan segera tersedia.</p>
      </div>
    </AdminLayout>
  );
}