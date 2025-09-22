//page.tsx

import Link from "next/link";

export default function Home() {
 return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
      <h1 className="text-4xl font-bold text-black">Welcome Beauty!</h1>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-purple-200 text-black rounded"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="px-6 py-3 bg-purple-200 text-black rounded"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
