import React, { useState, useRef, useEffect } from "react";
import { Filter } from "lucide-react";
import StudentPopup from "../pages/Modals/StudentPopup";
import { createPortal } from "react-dom";

export default function AttendanceManagement() {
  const attendanceData = [
    {
      studentId: "Stud123",
      name: "John Doe",
      seatId: "F1-R1-S1",
      date: "2025-08-20",
      checkIn: "11:00 AM",
      checkOut: "12:00 PM",
      hours: "2 h",
      remark: "Present",
    },
    {
      studentId: "Stud456",
      name: "Jane Smith",
      seatId: "F1-R1-S2",
      date: "2025-10-03",
      checkIn: "10:00 AM",
      checkOut: "11:30 AM",
      hours: "1.5 h",
      remark: "Absent",
    },
  ];

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const filterButtonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (showFilter && filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect();
      const dropdownWidth = 176; // approx w-44 = 11rem = 176px
      let left = rect.left + window.scrollX;

      if (left + dropdownWidth > window.innerWidth - 10) {
        left = window.innerWidth - dropdownWidth - 10;
      }

      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: left,
      });
    }
  }, [showFilter]);

  const filterData = () => {
    const today = new Date();
    if (selectedFilter === "Today") {
      return attendanceData.filter(
        (record) => new Date(record.date).toDateString() === today.toDateString()
      );
    } else if (selectedFilter === "This Week") {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      return attendanceData.filter(
        (record) => new Date(record.date) >= weekAgo
      );
    } else if (selectedFilter === "Previous Month") {
      const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const startOfMonth = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth(),
        1
      );
      const endOfMonth = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth() + 1,
        0
      );
      return attendanceData.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate >= startOfMonth && recordDate <= endOfMonth;
      });
    }
    return attendanceData;
  };

  const filteredData = filterData();

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-[#f8fafc]">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b gap-3 relative">
          <h2 className="text-lg font-semibold text-gray-800">
            Attendance Management
          </h2>

          {/* Filter Button */}
          <div className="ml-auto relative">
            <button
              ref={filterButtonRef}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base transition"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter size={18} />
              Filter
            </button>

            {/* Filter Dropdown */}
            {showFilter &&
              createPortal(
                <div
                  className="bg-white border rounded-lg shadow-lg w-44 z-50 py-1"
                  style={{
                    position: "absolute",
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                  }}
                >
                  {["Today", "This Week", "Previous Month"].map((option) => (
                    <p
                      key={option}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        selectedFilter === option
                          ? "bg-blue-50 font-semibold text-blue-600"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedFilter(option);
                        setShowFilter(false);
                      }}
                    >
                      {option}
                    </p>
                  ))}
                </div>,
                document.body
              )}
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-[850px] w-full text-sm text-left border-collapse">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-medium">Student ID</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Seat ID</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Check In</th>
                <th className="px-4 py-3 font-medium">Check Out</th>
                <th className="px-4 py-3 font-medium">Hours</th>
                <th className="px-4 py-3 font-medium">Remark</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors text-gray-800"
                >
                  <td
                    className="px-4 py-3 cursor-pointer text-blue-600 hover:underline"
                    onClick={() => setSelectedStudent(record)}
                  >
                    {record.studentId}
                  </td>
                  <td className="px-4 py-3">{record.name}</td>
                  <td className="px-4 py-3">{record.seatId}</td>
                  <td className="px-4 py-3">{record.date}</td>
                  <td className="px-4 py-3">{record.checkIn}</td>
                  <td className="px-4 py-3">{record.checkOut}</td>
                  <td className="px-4 py-3">{record.hours}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      record.remark === "Present"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {record.remark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden p-4 space-y-4">
          {filteredData.map((record, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm bg-gray-50 text-sm"
            >
              <p
                className="font-semibold text-blue-600 cursor-pointer hover:underline"
                onClick={() => setSelectedStudent(record)}
              >
                Student ID: {record.studentId}
              </p>
              <p>
                <span className="font-semibold">Name:</span> {record.name}
              </p>
              <p>
                <span className="font-semibold">Seat ID:</span> {record.seatId}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {record.date}
              </p>
              <p>
                <span className="font-semibold">Check In:</span>{" "}
                {record.checkIn}
              </p>
              <p>
                <span className="font-semibold">Check Out:</span>{" "}
                {record.checkOut}
              </p>
              <p>
                <span className="font-semibold">Hours:</span> {record.hours}
              </p>
              <p
                className={`font-semibold ${
                  record.remark === "Present"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Remark: {record.remark}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Popup */}
      <StudentPopup
        isOpen={selectedStudent !== null}
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}
