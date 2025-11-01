//layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import DoubleNav from "@/components/layout/DoubleNav";

import { Julius_Sans_One, Italiana } from "next/font/google";

const julius = Julius_Sans_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-julius",
});

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italiana",
});

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
      <body className={`${julius.variable} ${italiana.variable} min-h-screen flex flex-col`}>
        {/* Double Nav at the top */}
        <DoubleNav />

        {/* Page Content */}
        <main className='flex-1 bg-white'>{children}</main>
      </body>
    </html>
  );
}
