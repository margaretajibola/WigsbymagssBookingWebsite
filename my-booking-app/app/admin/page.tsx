// app/admin/page.tsx 

export default async function AdminDashboard() {

  // render protected content...
  return (
    <div>
      <h1 className="text-2xl font-medium text-purple-700 mb-6">
        Admin Dashboard
      </h1>
      <p className="text-gray-600">Overview of services, bookings, and clients.</p>
      {/* Add DashboardStats, RecentBookingsTable, etc. */}
    </div>
  );
}