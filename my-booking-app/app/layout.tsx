//layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import DoubleNav from "@/components/DoubleNav";

export const metadata: Metadata = {
  title: "My Booking App",
  description: "Booking website with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Double Nav at the top */}
        <DoubleNav />

        {/* Page Content */}
        <main className="flex-1 bg-white">{children}</main>
      </body>
    </html>
  );
}
