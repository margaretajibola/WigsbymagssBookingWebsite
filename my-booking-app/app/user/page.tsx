// app/user/page.tsx (server component)

export default async function UserDashboard() {

  // render protected content...
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
      <h1 className="text-2xl text-black">Welcome to your Dashboard - View your profile and bookings here...</h1>
    </div>
  );
}