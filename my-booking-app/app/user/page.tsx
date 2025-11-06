// app/user/page.tsx

"use client";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { BookingWithDetails } from "@/types/booking";
import UserBookingList from "@/components/bookings/UserBookingList";

export default function UserDashboard() {
  const [upcominguserbookings, setUpcomingUserBookings] = useState<BookingWithDetails[]>([]);
  const [pastuserbookings, setPastUserBookings] = useState<BookingWithDetails[]>([]);
  const { user } = useCurrentUser();

  const separateBookings = (bookings: BookingWithDetails[]) => {
    const now = new Date();
    
    const upcoming = bookings.filter(booking => 
      new Date(booking.date) >= now
    );
    
    const past = bookings.filter(booking => 
      new Date(booking.date) < now
    );
    
    return { upcoming, past };
  };  

  useEffect(() => {
    // Fetch all bookings and filter by user
    const fetchUserBookings = async () => {
      const res = await fetch('/api/bookings');
      const allBookings = await res.json();
      
      // Filter for current user's bookings
      const userBookings = allBookings.filter((booking: BookingWithDetails) => 
        booking.userId === user?.id
      );
      
      return userBookings;
    };

    if(user?.id) {
      fetchUserBookings()
      .then((userBookings) => {
        const { upcoming, past } = separateBookings(userBookings);
        setUpcomingUserBookings(upcoming);
        setPastUserBookings(past);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
    }
  }, [user?.id]);
    

  // render protected content...
  return (
    <div>
      <h1 className="text-2xl font-medium text-gray-600 mb-6">
        Upcoming Bookings ({upcominguserbookings.length})
      </h1>
      <UserBookingList bookings={upcominguserbookings} />

      <h1 className="text-2xl font-medium text-gray-600 mb-6">
        Past Bookings ({pastuserbookings.length})
      </h1>
      <UserBookingList bookings={pastuserbookings} />

    </div>
  );
}