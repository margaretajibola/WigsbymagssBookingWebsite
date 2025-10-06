// app/signup/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();

    if (res.ok) {
      window.dispatchEvent(new Event("user-refresh"));
      router.push("/auth/login");
    } else {
      alert(data.error || "Signup failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl text-center text-gray-800 mb-6">
          Hello Beauty!
        </h1>
        <h2 className="text-xl text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full px-4 py-2 border text-black placeholder-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
          />

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border text-black placeholder-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border text-black placeholder-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-purple-300 text-white font-semibold py-2 rounded-lg hover:bg-purple-500 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-purple-600 font-medium"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
