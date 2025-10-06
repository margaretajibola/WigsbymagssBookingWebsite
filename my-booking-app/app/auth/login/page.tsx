// app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.dispatchEvent(new Event("user-refresh"));
      router.push("/dashboard");
    } else {
      const data = await res.json();
      alert(data.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl text-center text-gray-800 mb-6">
          Welcome back Beauty!
        </h1>
        <h2 className="text-xl text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/auth/signup"
            className="text-purple-600 font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
