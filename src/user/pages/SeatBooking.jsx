import React, { useEffect, useState } from "react";
import ChairIcon from "/seat.svg";
import EditSeatPopup from "../pages/Modals/EditSeatModal";
import AddSeatPopup from "./Modals/Addseatmodel";
import { useNavigate } from "react-router-dom";
import { useGetAvailableSeatsQuery } from "../../Redux/Api/SeatApi";
import { useGetTimeSlotsQuery } from "../../Redux/Api/TimeSlotAoi";

const SeatManagement = () => {
  const navigate = useNavigate();
  const [activeFloor, setActiveFloor] = useState("Floor 1");
  const [activeTime, setActiveTime] = useState("Morning"); // 🔹 new
  const [seats, setSeats] = useState([]);
  const [editSeatPopupOpen, setEditSeatPopupOpen] = useState(false);
  const [addSeatPopupOpen, setAddSeatPopupOpen] = useState(false);

  const {
    data: seatsResponse,
    isLoading,
    isError,
    error,
  } = useGetAvailableSeatsQuery();

  useEffect(() => {
    setSeats(seatsResponse?.data || []);
  }, [seatsResponse]);

  const filteredSeats = seats.filter(
    (seat) => seat.floor === (activeFloor === "Floor 1" ? "1" : "2")
  );

  const rows = {};
  filteredSeats.forEach((seat) => {
    if (!rows[seat.row]) rows[seat.row] = [];
    rows[seat.row].push(seat);
  });

  const sortedRows = Object.keys(rows)
    .sort((a, b) => Number(a) - Number(b))
    .map((rowNum) => ({
      rowNum,
      seats: rows[rowNum].sort(
        (a, b) => Number(a.seatNumber) - Number(b.seatNumber)
      ),
    }));

    
  const getSeatColor = (seat) => {
    const isBooked =
      (activeTime === "Morning" && seat.bookedForMorning) ||
      (activeTime === "Evening" && seat.bookedForEvening) ||
      (activeTime === "Full Day" && seat.bookedForFullDay);

    if (isBooked) return "bg-red-600 text-white";
    if (
      !seat.bookedForMorning &&
      !seat.bookedForEvening &&
      !seat.bookedForFullDay
    )
      return "bg-gray-200 text-gray-700";
    return "bg-gray-200 text-gray-700";
  };

  if (isLoading) return <p>Loading seats...</p>;
  if (isError) return <p>Error fetching seats: {JSON.stringify(error)}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4 mb-4 px-4 sm:px-6 relative w-full">
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <div className="flex gap-2 flex-wrap bg-[#0073FF0F] p-3 rounded-lg -ml-4">
            {["Floor 1", "Floor 2"].map((floor) => (
              <button
                key={floor}
                className={`px-4 py-1.5 rounded-lg font-semibold whitespace-nowrap ${
                  activeFloor === floor
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveFloor(floor)}
              >
                {floor}
              </button>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap text-sm">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 bg-red-600 rounded"></span>Booked
            </div>
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 bg-gray-200 rounded"></span>Vacant
            </div>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <button
            onClick={() => setEditSeatPopupOpen(true)}
            className="bg-[#059500] text-white px-3 py-1.5 rounded-lg whitespace-nowrap"
          >
            + Edit Seat
          </button>
          <button
            onClick={() => setAddSeatPopupOpen(true)}
            className="bg-[#059500] text-white px-3 py-1.5 rounded-lg whitespace-nowrap"
          >
            + Add Seat
          </button>

          <button
            onClick={() => navigate("/bookingdetails")}
            className="text-black font-medium flex items-center gap-2 px-3 py-1 whitespace-nowrap"
          >
            View Bookings Info <span className="text-lg">›</span>
          </button>
        </div>
      </div>

      {/* Time Buttons */}
      <div className="overflow-x-auto scrollbar-hide mb-6 max-w-full">
        <div className="bg-gray-100 text-[#797878] rounded py-2 px-2 flex gap-4 whitespace-nowrap">
          {["Morning", "Evening", "Full Day"].map((time) => (
            <button
              key={time}
              onClick={() => setActiveTime(time)}
              className={`px-4 py-1.5 rounded-lg font-semibold ${
                activeTime === time
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Seats Grid */}
      <div className="w-full flex flex-col gap-4 mt-4">
        {sortedRows.map(({ rowNum, seats }) => (
          <div key={rowNum} className="flex items-center gap-4 ml-7">
            <div className="w-10 text-sm font-semibold text-blue-600 flex-shrink-0">
              R {rowNum}
            </div>

            <div className="flex gap-11 flex-wrap">
              {seats.map((seat) => (
                <div key={seat._id} className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold">
                    {seat.seatNumber}
                  </span>
                  <div
                    className={`w-14 h-14 rounded-md shadow flex items-center justify-center ${getSeatColor(
                      seat
                    )}`}
                  >
                    <img src={ChairIcon} alt="Chair" className="w-9 h-9" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Popups */}
      <EditSeatPopup
        isOpen={editSeatPopupOpen}
        onClose={() => setEditSeatPopupOpen(false)}
      />
      <AddSeatPopup
        isOpen={addSeatPopupOpen}
        onClose={() => setAddSeatPopupOpen(false)}
      />
    </div>
  );
};

export default SeatManagement;
