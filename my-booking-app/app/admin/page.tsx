// app/admin/page.tsx (server component)

export default async function AdminDashboard() {

  // render protected content...
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
      <h1 className="text-2xl text-black">Hi Admin - Manage your profile, services, and bookings here...</h1>
    </div>
  );
}