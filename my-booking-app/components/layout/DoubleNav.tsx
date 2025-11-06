// components/DoubleNav.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import Profile from "@/components/layout/Profile";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function DoubleNav() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    // optional placeholder while checking session
    return (
      <div className="ml-auto flex gap-4">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }
  return (
    <header>
      {/* Top nav */}
      <nav className="bg-purple-200 text-white px-6 py-3 flex items-center relative border-b-1 border-gray-400">
        {/* Centered brand name and logo*/}
        <div className="flex items-center gap-3 absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl text-black">WIGSBYMAGSS</h1>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="/logo.png"
              alt="My Logo"
              width={40}
              height={40}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Right-aligned auth buttons */}
        <div className="ml-auto flex items-center gap-4">
          {user ? (
            // ✅ If logged in → show logout
            <>
              <span className="text-gray-700">Hi, {user.name}</span>
              <Profile />
            </>
          ) : (
            // ❌ If not logged in → show login/signup links
            <>
              <Link href="/auth/login" className="text-black">
                Login
              </Link>
              <Link href="/auth/signup" className="text-black">
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Second nav */}
      <nav className="bg-purple-200 text-white px-6 py-2 flex justify-around relative border-b-1 border-gray-400">
        <Link href="/" className="text-black">HOME</Link>

        {/* Dropdown for Services */}
        <div className="relative group">
          <button className="text-black">
            BOOK A SERVICE ▾
          </button>

          <div
            className="absolute left-0 mt-2 w-48 bg-purple-200 text-gray-900 shadow-lg rounded-lg 
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
          >
            <Link
              href="/services/installations"
              className="block px-4 py-2 hover:bg-purple-300"
            >
              WIG INSTALLATIONS
            </Link>
            <Link
              href="/services/sewins"
              className="block px-4 py-2 hover:bg-purple-300"
            >
              SEW-INS
            </Link>
            <Link
              href="/services/otherservices"
              className="block px-4 py-2 hover:bg-purple-300"
            >
              OTHER SERVICES
            </Link>
          </div>
        </div>
        <Link href="/calendar" className="text-black">CALENDAR</Link>
        <Link href="/reviews" className="text-black">REVIEWS</Link>
        <Link href="/policies" className="text-black">POLICES</Link>
      </nav>
    </header>
  );
}
