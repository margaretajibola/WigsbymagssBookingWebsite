// app/booking-complete/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookingWithDetails } from '@/types/booking';

export default function BookingComplete() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('bookingId');
  const [booking, setBooking] = useState<BookingWithDetails | null>(null);

  useEffect(() => {
    if (bookingId) {
      fetch(`/api/bookings/${bookingId}`)
        .then(res => res.json())
        .then(setBooking);
    }
  }, [bookingId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <div className="text-6xl mb-4">✔️</div>
        <h1 className="text-3xl font-bold text-purple-400 mb-4">
          Booking Complete!
        </h1>
        {booking && (
          <div className="text-gray-600 mb-6">
            <p className="mb-2"><strong>Service:</strong> {booking.service.name}</p>
            <p className="mb-2"><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <p className="mb-2"><strong>Time:</strong> {booking.time}</p>
            <p className="mb-2"><strong>Price:</strong> ${booking.service.price}</p>
          </div>
        )}
        <button
          onClick={() => router.push('/user')}
          className="bg-purple-300 text-white px-6 py-3 rounded-lg hover:bg-purple-400 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
