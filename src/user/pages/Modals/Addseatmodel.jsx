import React, { useState } from "react";
import { X } from "lucide-react";
import { useAddSeatsMutation } from "../../../Redux/Api/SeatApi";

const AddSeatPopup = ({ isOpen, onClose }) => {
  const [floor, setFloor] = useState("");
  const [row, setRow] = useState("");
  const [seatNumber, setSeatNumber] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [errors, setErrors] = useState({});

  const [addSeats, { isLoading }] = useAddSeatsMutation();

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!floor) newErrors.floor = "Please select a floor.";
    if (!row) newErrors.row = "Please select a row.";

    if (!seatNumber.trim()) {
      newErrors.seatNumber = "Seat number is required.";
    } else if (!/^[A-Za-z0-9]+$/.test(seatNumber.trim())) {
      newErrors.seatNumber = "Only letters and numbers allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    setMessage("");
    setMessageType("");

    if (!validateForm()) return;

    const payload = [
      {
        floor: parseInt(floor),
        row: parseInt(row),
        seatNumber: seatNumber.trim(),
      },
    ];

    try {
      await addSeats(payload).unwrap();
      setMessage("Seat added successfully!");
      setMessageType("success");

      setFloor("");
      setRow("");
      setSeatNumber("");
      setErrors({});

      // hide popup after success
      setTimeout(() => {
        setMessage("");
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage(err?.data?.message || "Failed to add seat");
      setMessageType("error");
    }
  };

  // Clear field-level error dynamically
  const handleInputChange = (field, value) => {
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }

    switch (field) {
      case "floor":
        setFloor(value);
        break;
      case "row":
        setRow(value);
        break;
      case "seatNumber":
        setSeatNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* 🔹 Global message at top of screen (outside modal) */}
      {message && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-2 rounded-lg text-white font-medium shadow-lg transition-all duration-500 ${
            messageType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message}
        </div>
      )}

      {/* 🔹 Modal */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-2">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-5 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            <X size={20} />
          </button>

          <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
            Add New Seat
          </h2>

          {/* Floor select */}
          <div className="mb-3">
            <label className="block text-xs text-gray-600 mb-1">
              Select Floor
            </label>
            <select
              value={floor}
              onChange={(e) => handleInputChange("floor", e.target.value)}
              className={`w-full p-2 border rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 ${
                errors.floor ? "border-red-500" : "focus:ring-green-500"
              }`}
            >
              <option value="">Select Floor</option>
              <option value="1">Floor 1</option>
              <option value="2">Floor 2</option>
            </select>
            {errors.floor && (
              <p className="text-red-500 text-xs mt-1">{errors.floor}</p>
            )}
          </div>

          {/* Row select */}
          <div className="mb-3">
            <label className="block text-xs text-gray-600 mb-1">
              Select Row
            </label>
            <select
              value={row}
              onChange={(e) => handleInputChange("row", e.target.value)}
              className={`w-full p-2 border rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 ${
                errors.row ? "border-red-500" : "focus:ring-green-500"
              }`}
            >
              <option value="">Select Row</option>
              {Array.from({ length: 10 }).map((_, i) => (
                <option key={i} value={i + 1}>
                  Row {i + 1}
                </option>
              ))}
            </select>
            {errors.row && (
              <p className="text-red-500 text-xs mt-1">{errors.row}</p>
            )}
          </div>

          {/* Seat number input */}
          <div className="mb-4">
            <label className="block text-xs text-gray-600 mb-1">
              Enter Seat Number
            </label>
            <input
              type="text"
              value={seatNumber}
              onChange={(e) => handleInputChange("seatNumber", e.target.value)}
              placeholder="Enter Seat Number"
              className={`w-full p-2 border rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 ${
                errors.seatNumber ? "border-red-500" : "focus:ring-green-500"
              }`}
            />
            {errors.seatNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.seatNumber}</p>
            )}
          </div>

          {/* Add button */}
          <div className="flex justify-center">
            <button
              onClick={handleAdd}
              disabled={isLoading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Adding..." : "+ Add Seat"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSeatPopup;
