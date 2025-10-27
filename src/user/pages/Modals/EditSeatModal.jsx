import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown } from "lucide-react";
import {
  useDeleteSeatMutation,
  useGetAvailableSeatsQuery,
} from "../../../Redux/Api/SeatApi";

const EditSeatPopup = ({ isOpen, onClose, seatData }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(seatData?.floor || "1");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: seatsResponse } = useGetAvailableSeatsQuery();
  const allSeats = seatsResponse?.data || [];
  const seatsList = allSeats.filter((seat) => seat.floor === selectedFloor);
  const [deleteSeat, { isLoading: deleting }] = useDeleteSeatMutation();

  useEffect(() => {
    setSelectedSeats([]);
  }, [selectedFloor]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleSeatToggle = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleDelete = async () => {
    if (selectedSeats.length === 0) return;
    try {
      await Promise.all(selectedSeats.map((id) => deleteSeat(id).unwrap()));
      alert("Selected seats deleted successfully!");
      onClose();
    } catch (err) {
      console.error("Delete Seats Failed:", err);
      alert(err?.data?.message || "Failed to delete seats");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      {/* Popup Box */}
      <div className="bg-white rounded-2xl shadow-xl w-[400px] p-5 relative ">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Floor Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">
            Select Floor
          </label>
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="w-full p-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Floor 1</option>
            <option value="2">Floor 2</option>
          </select>
        </div>

        {/* Seat Selection Dropdown */}
        <div className="mb-4 relative" ref={dropdownRef}>
          <label className="block text-sm font-medium text-black mb-2">
            Select Seats to Delete
          </label>

          {/* Dropdown Trigger */}
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex justify-between items-center border rounded-lg px-3 py-2 cursor-pointer bg-white text-gray-700"
          >
            <span>
              {selectedSeats.length > 0
                ? `${selectedSeats.length} seat(s) selected`
                : "Select Seats"}
            </span>
            <ChevronDown size={18} className="text-gray-500" />
          </div>

          {/* Dropdown Content (with visible scrollbar, stays inside popup) */}
          {dropdownOpen && (
            <div
              className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-44 overflow-y-scroll z-20"
              style={{
                scrollbarWidth: "auto",
                scrollbarColor: "#9ca3af #f3f4f6",
              }}
            >
              <style>
                {`
                  /* Chrome, Edge, Safari */
                  .scrollbar-visible::-webkit-scrollbar {
                    width: 8px;
                  }
                  .scrollbar-visible::-webkit-scrollbar-thumb {
                    background-color: #9ca3af;
                    border-radius: 10px;
                  }
                  .scrollbar-visible::-webkit-scrollbar-track {
                    background: #f3f4f6;
                  }
                `}
              </style>

              <div className="scrollbar-visible">
                {seatsList.length === 0 ? (
                  <p className="p-2 text-gray-400 text-sm">No seats available</p>
                ) : (
                  seatsList.map((seat) => (
                    <label
                      key={seat._id}
                      className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSeats.includes(seat._id)}
                        onChange={() => handleSeatToggle(seat._id)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{seat.seatNumber}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Delete Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleDelete}
            disabled={deleting || selectedSeats.length === 0}
            className={`px-5 py-2 rounded-lg text-white ${
              selectedSeats.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#059500] hover:bg-green-600"
            }`}
          >
            {deleting ? "Deleting..." : `Delete ${selectedSeats.length} Seat(s)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSeatPopup;
