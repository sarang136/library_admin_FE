import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import studentImage from "/student.png";
import AttendanceTab from "../../components/AttendanceTab";
import FeesTab from "../../components/FeesTab";
import { useGetAllBookingsQuery } from "../../../Redux/Api/BookingApi";

const StudentPopup = ({ isOpen, onClose, student }) => {
  const [activeTab, setActiveTab] = useState("personal");

  // ✅ Fetch all bookings
  const { data, isLoading, isError } = useGetAllBookingsQuery();

  // ✅ Log the fetched data
  useEffect(() => {
    if (data) {
      console.log("📘 All Bookings Data:", data);
    }
  }, [data]);

  if (!isOpen) return null;

  // ✅ Extract student info (you can match by ID or name)
  const allBookings = Array.isArray(data?.data) ? data.data : data?.bookings || [];
  const currentStudent =
    allBookings.find((item) => item?._id === student?._id) || student;

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white p-6 rounded-xl">Loading student data...</div>
      </div>
    );

  if (isError)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white p-6 rounded-xl text-red-500">
          Failed to fetch student data
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-xl w-[850px] h-[550px] p-5 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        {/* ===== Header Section ===== */}
        <div className="grid grid-cols-3 items-center border-b pb-3">
          <div className="flex gap-3 items-center">
            <img
              src={studentImage}
              alt="student"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-base font-outfit">
                {currentStudent?.name || "N/A"}
              </h2>
              <p className="text-gray-500 text-xs">
                {currentStudent?.contact || "N/A"}
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-blue-500 font-medium text-sm">
              {currentStudent?.timeSlot || "N/A"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-gray-700 text-sm">
              Seat ID{" "}
              <span className="font-bold">{currentStudent?.seatId || "N/A"}</span>
            </p>
          </div>
        </div>

        {/* ===== Status Cards Row ===== */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          <div className="bg-green-100 rounded-lg p-3 text-center">
            <p className="text-gray-600 text-xs">Check In Time</p>
            <p className="text-lg font-semibold text-green-700">
              {currentStudent?.checkIn || "N/A"}
            </p>
          </div>
          <div className="bg-red-100 rounded-lg p-3 text-center">
            <p className="text-gray-600 text-xs">Check Out Time</p>
            <p className="text-lg font-semibold text-red-700">
              {currentStudent?.checkOut || "N/A"}
            </p>
          </div>
          <div className="bg-yellow-100 rounded-lg p-3 text-center">
            <p className="text-gray-600 text-xs mb-1">Attendance</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: currentStudent?.attendance || "80%" }}
              ></div>
            </div>
            <p className="text-sm font-semibold text-yellow-700 mt-1">
              {currentStudent?.attendance || "80%"}
            </p>
          </div>
          <div className="bg-green-100 rounded-lg p-3 text-center">
            <p className="text-gray-600 text-xs">Paid Amount</p>
            <p className="text-lg font-semibold text-green-700">
              ₹{currentStudent?.paidAmount || "0"}
            </p>
          </div>
          <div className="bg-red-100 rounded-lg p-3 text-center">
            <p className="text-gray-600 text-xs">Remaining Amount</p>
            <p className="text-lg font-semibold text-red-700">
              ₹{currentStudent?.remainingAmount || "0"}
            </p>
          </div>
        </div>

        {/* ===== Tabs ===== */}
        <div className="grid grid-cols-3 text-center mt-5 border-b">
          <button
            onClick={() => setActiveTab("personal")}
            className={`pb-1 text-sm font-medium ${
              activeTab === "personal"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Personal
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`pb-1 text-sm font-medium ${
              activeTab === "attendance"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Attendance
          </button>
          <button
            onClick={() => setActiveTab("fees")}
            className={`pb-1 text-sm font-medium ${
              activeTab === "fees"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Fees & Payouts
          </button>
        </div>

        {/* ===== Tab Content ===== */}
        <div className="mt-4 h-[250px] overflow-y-auto">
          {activeTab === "personal" && (
            <div className="grid grid-cols-3 gap-3 text-sm">
              {[
                { label: "Name", value: currentStudent?.name },
                { label: "Contact No", value: currentStudent?.contact },
                { label: "Parents No", value: currentStudent?.parentsNo },
                { label: "Address", value: currentStudent?.address },
                { label: "Registered Date", value: currentStudent?.registered },
                { label: "Booking Date", value: currentStudent?.booking },
                { label: "Duration", value: currentStudent?.duration },
                { label: "Vacant Date", value: currentStudent?.vacant },
                { label: "Amount", value: currentStudent?.amount },
                { label: "DOB", value: currentStudent?.dob },
                { label: "Email", value: currentStudent?.email },
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="text-gray-600 text-xs">{field.label}</label>
                  <input
                    className="w-full p-1.5 border border-gray-300 rounded-lg text-sm bg-white text-black"
                    value={field.value || "N/A"}
                    readOnly
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "attendance" && <AttendanceTab student={currentStudent} />}

          {activeTab === "fees" && <FeesTab student={currentStudent} />}
        </div>

        {/* ===== Action Buttons ===== */}
        <div className="flex justify-end gap-2 mt-5">
          <button className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm">
            Notify
          </button>
          <button className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm">
            Delete
          </button>
          <button className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm">
            Block
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentPopup;
