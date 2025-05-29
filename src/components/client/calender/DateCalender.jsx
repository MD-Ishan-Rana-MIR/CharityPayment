import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

const timeSlots = [
  { id: 1, slot: "10:00 AM" },
  { id: 2, slot: "11:00 AM" },
  { id: 3, slot: "12:00 PM" },
  { id: 4, slot: "2:00 PM" },
  { id: 5, slot: "4:00 PM" },
];

const bookedSlots = [
  { date: "2025-04-13", timeId: 1 },
  { date: "2025-04-14", timeId: 2 },
  { date: "2025-04-14", timeId: 3 },
  { date: "2025-04-14", timeId: 4 },
  { date: "2025-04-14", timeId: 5 },
  { date: "2025-04-14", timeId: 1 },
  { date: "2025-04-15", timeId: 3 },
  { date: "2025-04-16", timeId: 4 },
  { date: "2025-04-17", timeId: 5 },
  { date: "2025-04-18", timeId: 1 },
  { date: "2025-04-19", timeId: 2 },
  { date: "2025-04-20", timeId: 3 },
];

const CustomCalendar = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const isTimeBooked = (timeId) => {
    return bookedSlots.some(
      (slot) => slot.date === formattedDate && slot.timeId === timeId
    );
  };

  const handleTimeClick = (time) => {
    if (!isTimeBooked(time.id)) {
      setSelectedTime(time.id);
    }
  };

  const handleChange = (date) => {
    setSelectedDate(date);
    onDateChange(date); // Lift date up to parent if needed
  };

  return (
    <div className="">
      <Calendar
        onChange={handleChange}
        value={selectedDate}
        minDate={new Date()} // disable past dates
        tileClassName={({ date }) => {
          if (
            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
          ) {
            return "bg-[#403730] text-white rounded-full space-x-4 ";
          }
          return "";
        }}
        className="w-full rounded-md"
      />

      <p className="mt-4 text-center text-sm text-gray-600">
        Selected Date:{" "}
        <span className="font-medium">{format(selectedDate, "PPP")}</span>
      </p>
      {timeSlots.every((time) => isTimeBooked(time.id)) ? (
        <p className="text-red-500 mt-2">No available slots for this date</p>
      ) : (
        <ul className="mt-2 flex flex-wrap gap-3">
          {timeSlots.map((time) => {
            const booked = isTimeBooked(time.id);
            const selected = selectedTime === time.id;

            return (
              <li
                key={time.id}
                onClick={() => handleTimeClick(time)}
                className={`cursor-pointer px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  booked
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : selected
                    ? "bg-[#403730] text-white"
                    : "bg-white hover:bg-[#f0f0f0] text-[#403730] border-[#A6ABAC]"
                }`}
              >
                {time.slot}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomCalendar;
