import React, { useState } from "react";
import { FaCalendarAlt, FaSignInAlt, FaSignOutAlt, FaClock, FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";




import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // default styles

const AttendancePage1 = () => {
  const [date, setDate] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const ToggleCheckButton = () => {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-sm">
          Manage your daily lab attendance with check-in and check-out system.
        </h1>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-6">
          {/* Cards */}
          <div className="grid grid-cols-3 gap-4">
            {/* Date Card */}
            <div className="bg-blue-100 rounded-lg shadow p-4 relative">
              <FaCalendarAlt className="absolute top-3 text-white bg-blue-500 rounded-xl p-2 text-4xl" />
              <p className="text-gray-500 mt-12">Date</p>
              <h2 className="text-xl font-bold text-black">{date.toDateString()}</h2>
            </div>

            {/* Check In Card */}
            <div className="bg-green-100 rounded-lg shadow p-4 relative">
              <FaSignInAlt className="absolute top-3 text-white text-4xl bg-green-500 p-2 rounded-xl" />
              <p className="text-gray-500 mt-12">Check In</p>
              <h2 className="text-xl font-bold text-green-600">11:30 AM</h2>
            </div>

            {/* Check Out Card */}
            <div className="bg-white rounded-lg shadow p-4 relative">
              <FaSignOutAlt className="absolute top-3 text-white text-4xl bg-red-500 rounded-xl p-2" />
              <p className="text-gray-500 mt-12">Check Out</p>
              <h2 className="text-xl font-bold text-red-600">Not Yet</h2>
            </div>
          </div>

          {/* Hours + Toggle */}

          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between ">
            {/* Left: Icon + Label */}
            <div className="flex items-center gap-2">
              <FaClock className="text-blue-600 text-xl" />
              <p className="text-gray-500 font-medium text-xl">Total Hours</p>
            </div>

            {/* Center: Time */}
            <div className="text-center">
              <h2 className="text-4xl font-bold">00 : 00 : 00</h2>
            </div>

            {/* Right: Toggle Button + Text */}
            <div className="flex flex-col items-center">
              <div
                onClick={() => setIsCheckedIn((prev) => !prev)}
                className={`w-20 h-10  flex items-center justify-start cursor-pointer rounded-full p-2 transition-colors duration-300
        ${isCheckedIn ? "bg-red-600" : "bg-green-600"}`}
              >
                <div
                  className={`bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center text-xs font-semibold transition-transform duration-300
          ${isCheckedIn ? "translate-x-[85%]" : "translate-x-0"}`}
                >
                  {isCheckedIn ? <FaMoon className="text-red-500 text-xl" /> : <FaSun className="text-yellow-500 text-xl" />}
                </div>
              </div>
              {/* Text below toggle */}
              <span className="mt-2 text-gray-700 font-medium">
                {isCheckedIn ? "Check Out" : "Check In"}
              </span>
            </div>
          </div>



          {/* Attendance History */}
          <div className="flex justify-between items-start gap-4">
            {/* Left Column */}
            <div className="flex-1">
              {/* Heading outside the card */}
              <h2 className="font-semibold text-lg mb-2">My Attendance History</h2>

              {/* Attendance Card */}
              <div className="bg-white rounded-lg shadow p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-black bg-blue-100 ">
                      <th className="py-2 px-3">Day</th>
                      <th className="py-2 px-3">Check In</th>
                      <th className="py-2 px-3">Check Out</th>
                      <th className="py-2 px-3">Hours</th>
                      <th className="py-2 px-3">Remark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-2 px-3">17 Sept 2025</td>
                      <td className="py-2 px-3">1:20 PM</td>
                      <td className="py-2 px-3">2:20 PM</td>
                      <td className="py-2 px-3">1h</td>
                      <td className="py-2 px-3 text-green-600">Present</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">18 Sept 2025</td>
                      <td className="py-2 px-3">00:00 PM</td>
                      <td className="py-2 px-3">00:00 PM</td>
                      <td className="py-2 px-3">0h</td>
                      <td className="py-2 px-3 text-red-600">Absent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Month Dropdown + View All */}
            <div className="flex flex-col gap-2 max-w-[200px] mt-8">
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded">
                <FaRegCalendarAlt className="text-blue-500" />
                <select className="bg-transparent outline-none text-gray-700 text-sm">
                  <option>September 2025</option>
                  <option>August 2025</option>
                  <option>July 2025</option>
                  <option>June 2025</option>
                </select>
              </div>

              <Link to="/history" className="text-blue-600 text-sm hover:underline mt-16">
                View All
              </Link>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 bg-blue-100 rounded-xl p-5">
          {/* Calendar */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-semibold mb-4">Calendar</h2>
            <Calendar onChange={setDate} value={date} className="rounded-lg p-3" />
            <p className="text-sm text-red-500 flex justify-center mt-3">
              Note: Lab will be closed on Sunday
            </p>
          </div>

          {/* Time Slot */}
          <div className="bg-white  rounded-lg shadow p-4 text-sm">
            <p>Time Slot: 10:00 AM - 12:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage1;
