// app/admin/services/page.tsx 

"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import UpdateProfile from "@/components/profile/UpdateProfile"

export default function AdminProfile() {
  const { user } = useCurrentUser();
  const handleUpdateName = async (name: string) => {
    const res = await fetch(`/api/users/${user?.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    
    if (res.ok) {
      alert('Name updated successfully!');
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-medium mb-4 text-gray-600">
        Update Profile
      </h1>
      <UpdateProfile user={user} onSubmit={handleUpdateName} />
    </div>
  );
}
