// app/user/page.tsx

export default async function UserDashboard() {

  // render protected content...
  return (
    <div>
      <h1 className="text-2xl font-medium text-gray-600 mb-6">
        Upcoming Bookings
      </h1>

      <h1 className="text-2xl font-medium text-gray-600 mb-6">
        Past Bookings
      </h1>

    </div>
  );
}