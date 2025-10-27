// components/CalendarPicker.tsx
"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/calendar.css"; // optional overrides

interface CalendarPickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

export default function CalendarPicker({ selectedDate, onChange }: CalendarPickerProps) {
  return (
    <div className="bg-purple-50 rounded-2xl p-6 shadow-sm">
      <Calendar
        onChange={(value) => onChange(value as Date)}
        value={selectedDate}
        className="border-0 bg-transparent text-gray-700"
        prevLabel={<span className="text-2xl text-gray-400">‹</span>}
        nextLabel={<span className="text-2xl text-gray-400">›</span>}
      />
    </div>
  );
}
