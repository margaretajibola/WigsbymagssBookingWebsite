import Sidebar from "@/components/layout/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar role="admin" />
      
      <main className="flex-1 p-8 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
