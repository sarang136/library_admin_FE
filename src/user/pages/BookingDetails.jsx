import React, { useState, useEffect } from "react";
import { useGetAllBookingsQuery } from "../../Redux/Api/BookingApi";
import NotifyPopup from "../pages/Modals/NotifyPopup";

const BookingInformation = () => {
  const [activeFloor, setActiveFloor] = useState("Floor 1");
  const [activeTime, setActiveTime] = useState("all"); // show all initially
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data, isLoading, isError } = useGetAllBookingsQuery();

  const bookings = Array.isArray(data?.data) ? data.data : [];
  const selectedFloor = activeFloor.replace("Floor ", "").trim();

  // ✅ Filter by floor first
  let filteredBookings = bookings.filter(
    (b) => b?.seatId?.floor?.toString() === selectedFloor
  );

  // ✅ Then filter by timing if not "all"
  if (activeTime !== "all") {
    filteredBookings = filteredBookings.filter(
      (b) => b.timings?.toLowerCase() === activeTime
    );
  }

  // Popup handler
  const handleNotifyClick = (booking) => {
    setSelectedBooking(booking);
    setIsNotifyOpen(true);
  };

  const handleSendNotification = (message) => {
    console.log(`Notification sent to ${selectedBooking?.name}:`, message);
  };

  if (isLoading)
    return <div className="p-6 text-center text-gray-500">Loading bookings...</div>;

  if (isError)
    return <div className="p-6 text-center text-red-500">Failed to load booking data.</div>;

  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-md relative">
      {/* Floor Tabs */}
      <div className="flex gap-4 mb-4 flex-wrap">
        {["Floor 1", "Floor 2"].map((floor) => (
          <button
            key={floor}
            onClick={() => setActiveFloor(floor)}
            className={`px-6 py-2 rounded-lg font-medium transition ${activeFloor === floor
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {floor}
          </button>
        ))}
      </div>

      {/* Time Filters */}
      <div className="flex gap-3 mb-5 bg-gray-100 rounded-lg p-2 w-fit">
        {[
          { label: "All", value: "all" },
          { label: "Morning", value: "morning" },
          { label: "Evening", value: "evening" },
          { label: "Full Day", value: "fullday" },
        ].map((slot) => (
          <button
            key={slot.value}
            onClick={() => setActiveTime(slot.value)}
            className={`px-4 py-1.5 rounded-lg font-medium ${activeTime === slot.value
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
              }`}
          >
            {slot.label}
          </button>
        ))}
      </div>

      {/* Booking Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="p-3">SeatID</th>
              <th className="p-3">Seat No</th>
              <th className="p-3">Customer Name</th>
              <th className="p-3">Timings</th>
              <th className="p-3">Booking Date</th>
              <th className="p-3">Vacant Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((seat, index) => (
                <tr
                  key={index}
                  className={`border-b text-sm ${seat.status === "booked"
                      ? "bg-red-100"
                      : seat.status === "expired"
                        ? "bg-gray-100"
                        : "hover:bg-gray-50"
                    }`}
                >
                  <td className="p-3 whitespace-nowrap">
                    #{seat._id.slice(-6)}
                  </td>

                  <td className="p-3">{seat?.seatId?.seatNumber || "N/A"}</td>
                  <td className="p-3">{seat.name || "N/A"}</td>
                  <td className="p-3 capitalize">{seat.timings || "N/A"}</td>
                  <td className="p-3">
                    {seat.createdAt
                      ? new Date(seat.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-3">
                    {seat.expiryDate
                      ? new Date(seat.expiryDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td
                    className={`p-3 font-medium ${seat.status === "booked"
                        ? "text-green-600"
                        : seat.status === "expired"
                          ? "text-red-500"
                          : "text-gray-600"
                      }`}
                  >
                    {seat.status || "N/A"}
                  </td>
                  <td className="p-3 flex gap-2 justify-center whitespace-nowrap">
                    <button
                      onClick={() => handleNotifyClick(seat)}
                      className="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Notify
                    </button>
                    <button className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700">
                      Release
                    </button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-gray-500 py-4 font-medium"
                >
                  No {activeTime === "all" ? "" : activeTime} bookings found for{" "}
                  {activeFloor}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Notify Popup */}
      <NotifyPopup
        isOpen={isNotifyOpen}
        onClose={() => setIsNotifyOpen(false)}
        onSend={handleSendNotification}
        defaultMessage={
          selectedBooking ? `Hello ${selectedBooking.name}, ` : ""
        }
      />
    </div>
  );
};

export default BookingInformation;
