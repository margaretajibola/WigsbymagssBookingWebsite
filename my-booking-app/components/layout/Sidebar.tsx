// components/Sidebar.tsx

import Link from "next/link";

export default function Sidebar({ role }: { role: "admin" | "user" }) {
  const adminLinks = [
    { name: "Dashboard", path: "/admin" },
    { name: "Services", path: "/admin/services" },
    { name: "Bookings", path: "/admin/bookings" },
    { name: "Profile", path: "/admin/profile" },
  ];

  const userLinks = [
    { name: "Dashboard", path: "/user" },
    { name: "Profile", path: "/user/profile" },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <aside className="w-56 bg-purple-200 min-h-screen p-6">
      <ul className="space-y-4">
        {links.map(link => (
          <li key={link.name}>
            <Link
              href={link.path}
              className="block text-gray-700 hover:text-purple-400"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
