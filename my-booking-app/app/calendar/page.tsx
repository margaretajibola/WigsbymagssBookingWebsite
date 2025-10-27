// app/calendar/page.tsx

"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight } from "lucide-react"; // ✅ import arrow icons

const CalendarPicker = dynamic(() => import("@/components/CalendarPicker"), {
  ssr: false,
});
import TimeSelector from "@/components/TimeSelector";

export default function Calendar() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {/* Title */}
      <div className="w-full max-w-5xl">
        <h1 className="text-gray-700 text-m uppercase tracking-wider mb-12 text-left">
          Select Date and Time
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row items-start justify-center gap-16 w-full max-w-5xl">
        {/* Calendar Section */}
        <div className="flex-shrink-0">
          <CalendarPicker selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>

        {/* Time Selector Section */}
        <div className="flex flex-col flex-1 items-start">
          <h2 className="text-gray-700 text-lg font-medium mb-6">
            {format(selectedDate, "EEEE, MMMM d")}
          </h2>
          <TimeSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-5xl mt-16 flex justify-between items-center">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition shadow-sm"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          disabled={!selectedTime}
          className={`p-3 rounded-full shadow-sm transition ${
            selectedTime
              ? "bg-purple-300 hover:bg-purple-300 text-white"
              : "bg-gray-100 cursor-not-allowed text-gray-400"
          }`}
          aria-label="Next"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}



