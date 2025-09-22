// components/DoubleNav.tsx

import Link from "next/link";

export default function DoubleNav() {
  return (
    <header>
      {/* Top nav */}
      <nav className="bg-purple-200 text-white px-6 py-3 flex items-center relative border-b-1 border-gray-400">
        {/* Centered brand name */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl text-black">
          WIGSBYMAGSS
        </h1>

        {/* Right-aligned auth buttons */}
        <div className="ml-auto flex gap-4">
          <Link href="/" className="text-black">LOGIN/SIGNUP</Link>
        </div>
      </nav>

      {/* Second nav */}
      <nav className="bg-purple-200 text-white px-6 py-2 flex justify-around relative border-b-1 border-gray-400">
        <Link href="/" className="text-black">HOME</Link>

        {/* Dropdown for Services */}
        <div className="relative group">
          <button className="text-black">
            SERVICES ▾
          </button>

          <div
            className="absolute left-0 mt-2 w-48 bg-purple-200 text-gray-900 shadow-lg rounded-lg 
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          >
            <Link
              href="/services/installations"
              className="block px-4 py-2 hover:bg-gray-50"
            >
              WIG INSTALLATIONS
            </Link>
            <Link
              href="/services/sewins"
              className="block px-4 py-2 hover:bg-gray-50"
            >
              SEW-INS
            </Link>
            <Link
              href="/services/otherservices"
              className="block px-4 py-2 hover:bg-gray-50"
            >
              OTHER SERVICES
            </Link>
          </div>
        </div>

        <Link href="/policies" className="text-black">POLICES</Link>
        <Link href="/calendar" className="text-black">CALENDER</Link>
        <Link href="/reviews" className="text-black">REVIEWS</Link>
      </nav>
    </header>
  );
}
