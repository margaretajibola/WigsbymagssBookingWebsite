// components/BookingList.tsx

"use client";
import { BookingWithDetails } from "@/types/booking";

type Props = {
  bookings: BookingWithDetails[];
};


export default function UserBookingList({ bookings }: Props) {
    return (
    <div className="overflow-hidden rounded-lg">
      <table className="table-fixed w-full bg-purple-100 text-black rounded-lg shadow-sm mb-6">
        <thead className="bg-purple-100">
          <tr>
            <th className="text-left py-3 px-4 text-gray-600">Appointment Date</th>
            <th className="text-left py-3 px-4 text-gray-600">Appointment Time</th>
            <th className="text-gray-600">Service Type</th>
            <th className="text-gray-600">Price</th>
            <th className="text-gray-600">Your Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td className="py-2 px-4 text-black">{new Date(booking.date).toLocaleDateString()}</td>
              <td className="text-center text-black">{booking.time}</td>
              <td className="text-center text-black">{booking.service.name}</td>
              <td className="text-center text-black">{booking.service.price} CAD</td>
              <td className="text-center text-black">{booking.notes}</td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                You have no appointments.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    );
}