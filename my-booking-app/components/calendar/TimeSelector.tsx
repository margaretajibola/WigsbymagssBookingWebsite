// components/TimeSelector.tsx
"use client";

interface TimeSelectorProps {
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

const timeSlots = ["12:00 PM", "2:00 PM", "4:00 PM"];

export default function TimeSelector({ selectedTime, setSelectedTime }: TimeSelectorProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      {timeSlots.map((time) => (
        <button
          key={time}
          onClick={() => setSelectedTime(time)}
          className={`w-full py-3 rounded-lg shadow-sm transition font-medium ${
            selectedTime === time
              ? "bg-purple-300 text-white"
              : "bg-purple-100 text-gray-800 hover:bg-purple-200"
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
