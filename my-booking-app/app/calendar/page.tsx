// app/calendar/page.tsx
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react"; // ✅ import arrow icons

const CalendarPicker = dynamic(() => import("@/components/calendar/CalendarPicker"), {
  ssr: false,
});

export default function Calendar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  const notes = searchParams.get('notes') || "";
  const { user } = useCurrentUser();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(false);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    // Runs whenever date changes
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        const res = await fetch(`/api/availability?date=${dateStr}`);
        const times = await res.json();
        setAvailableTimes(times);
        setSelectedTime("");
      } catch (error) {
        console.error('Failed to fetch availability:', error);
        setAvailableTimes([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAvailability();
  }, [selectedDate]);

  const addTimeSlot = async () => {
    if (!newTime || availableTimes.includes(newTime)) return;
    
    const updatedTimes = [...availableTimes, newTime].sort();
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    
    const res = await fetch('/api/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: dateStr, timeSlots: updatedTimes })
    });
    
    if (res.ok) {
      setAvailableTimes(updatedTimes);
      setNewTime("");
    }
  };

  const removeTimeSlot = async (timeToRemove: string) => {
    const updatedTimes = availableTimes.filter(t => t !== timeToRemove);
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    
    const res = await fetch('/api/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: dateStr, timeSlots: updatedTimes })
    });
    
    if (res.ok) {
      setAvailableTimes(updatedTimes);
      if (selectedTime === timeToRemove) {
        setSelectedTime("");
      }
    }
  };

  const handleNext = async () => {
    if (!selectedTime || !serviceId) return;
    
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceId: parseInt(serviceId),
        date: selectedDate.toISOString(),
        time: selectedTime,
        notes: notes,
      }),
    });
    
    if (res.ok) {
      const booking = await res.json();
      router.push(`/booking-complete?bookingId=${booking.id}`);
    } else {
      alert('Booking failed. Please try again.');
    }
  };

return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl">
        <h1 className="text-gray-700 text-m uppercase tracking-wider mb-12 text-center">
          Select Date and Time
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center gap-16 w-full max-w-5xl">
        <div className="flex-shrink-0">
          <CalendarPicker selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>

        <div className="flex flex-col flex-1 items-start">
          <h2 className="text-gray-700 text-lg font-medium mb-6">
            {format(selectedDate, "EEEE, MMMM d")}
          </h2>

          {isAdmin && (
            <div className="mb-6 p-4 bg-purple-100 rounded-lg w-full">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Admin: Manage Times</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="border p-2 rounded text-black"
                />
                <button
                  onClick={addTimeSlot}
                  className="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-900 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <p>Loading available times...</p>
          ) : availableTimes.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 w-full">
              {availableTimes.map((time) => (
                <div key={time} className="relative">
                  <button
                    onClick={() => !isAdmin && setSelectedTime(time)}
                    className={`w-full p-3 rounded-lg border transition ${
                      selectedTime === time && !isAdmin
                        ? "bg-purple-300 text-white border-purple-300"
                        : "bg-purple-100 text-gray-700 border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    {time}
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => removeTimeSlot(time)}
                      className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full p-1 hover:bg-purple-900"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              {isAdmin ? "No times set for this date. Add some above." : "No available times for this date"}
            </p>
          )}
        </div>
      </div>

      {!isAdmin && (
        <div className="w-full max-w-5xl mt-16 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition shadow-sm"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedTime}
            className={`p-3 rounded-full shadow-sm transition ${
              selectedTime
                ? "bg-purple-300 text-white hover:bg-purple-600"
                : "bg-gray-100 cursor-not-allowed text-gray-400"
            }`}
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}



