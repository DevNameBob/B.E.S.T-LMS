// MiniCalendar.jsx
// A simple monthly calendar component that displays the current month in a grid.
// Highlights today's date and dims days outside the current month.
// Uses date-fns for date manipulation and formatting.

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isToday,
} from 'date-fns';

export default function MiniCalendar() {
  // Get today's date
  const today = new Date();

  // Calculate the start and end of the current month
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(monthStart);

  // Calculate the first and last visible days in the calendar grid
  // Ensures the grid starts on Monday and ends on Sunday
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = 'd'; // Format for displaying day numbers
  const days = []; // Array to hold all day cells
  let day = startDate;

  // Generate day cells for the calendar grid
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;

      days.push(
        <div
          key={cloneDay}
          className={`text-sm text-center py-2 rounded ${
            !isSameMonth(cloneDay, monthStart)
              ? 'text-gray-300' // Dim days outside the current month
              : isToday(cloneDay)
              ? 'bg-indigo-500 text-white font-semibold' // Highlight today
              : 'text-gray-700' // Normal day
          }`}
        >
          {format(cloneDay, dateFormat)}
        </div>
      );

      // Move to the next day
      day = addDays(day, 1);
    }
  }

  // Weekday labels (starting on Monday)
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* Section heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">This Month</h2>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar day grid */}
      <div className="grid grid-cols-7 gap-y-1">{days}</div>
    </div>
  );
}