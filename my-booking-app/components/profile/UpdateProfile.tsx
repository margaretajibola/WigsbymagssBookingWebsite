"use client";
import { useState } from "react";

interface UpdateProfileProps {
  user: {
    id: number;
    name?: string;
    email: string;
  } | null;
  onSubmit: (name: string) => void;
}

export default function UpdateProfile({ user, onSubmit }: UpdateProfileProps) {
  const [name, setName] = useState(user?.name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="text-lg font-medium text-gray-600 mb-6">Email</label>
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="w-full p-2 border rounded bg-gray-100 text-gray-600"
        />
      </div>

      <div className="mb-4">
        <label className="text-lg font-medium text-gray-600 mb-6">Name</label>
        <input
          type="text"
          value={name}
          placeholder={user?.name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded text-gray-600"
          required
        />
      </div>

      <button
        type="submit"
        className="w-32 bg-purple-300 text-white py-2 rounded hover:bg-purple-400"
      >
        Update Profile
      </button>
    </form>
  );
}

