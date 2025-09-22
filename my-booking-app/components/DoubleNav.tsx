// components/DoubleNav.tsx

'use client'

import Link from "next/link";
import { useState } from "react";

export default function DoubleNav() {
  const [isOpen, setIsOpen] = useState(false);  
  return (
    <header>
      {/* Top nav */}
      <nav className="bg-purple-200 text-white px-6 py-3 flex items-center relative border-b-1 border-black">
        {/* Centered brand name */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-black">
          WIGSBYMAGSS
        </h1>

        {/* Right-aligned auth buttons */}
        <div className="ml-auto flex gap-4">
          <Link href="/" className="text-black">Login/Signup</Link>
        </div>
      </nav>

      {/* Second nav */}
      <nav className="bg-purple-200 text-white px-6 py-2 flex justify-around relative border-b-1 border-black">
        <Link href="/" className="text-black">Home</Link>

        {/* Dropdown for Services */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black"
          >
            Services ▾
          </button>
          {isOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-purple-200 text-gray-900 shadow-lg rounded-lg">
              <Link
                href="/services/installations"
                className="block px-4 py-2 hover:bg-gray-50"
              >
                Wig Installations
              </Link>
              <Link
                href="/services/sewins"
                className="block px-4 py-2 hover:bg-gray-50"
              >
                Sew-ins
              </Link>
              <Link
                href="/services/otherservices"
                className="block px-4 py-2 hover:bg-gray-50"
              >
                Other Services
              </Link>
            </div>
          )}
        </div>

        <Link href="/policies" className="text-black">Policies</Link>
        <Link href="/calendar" className="text-black">Calendar</Link>
        <Link href="/reviews" className="text-black">Reviews</Link>
      </nav>
    </header>
  );
}
