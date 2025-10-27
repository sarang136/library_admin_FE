import React, { useState } from "react";
import { X } from "lucide-react";
import { useAddTimeSlotMutation } from "../../../Redux/Api/TimeSlotAoi";

const TimeSlotPopup = ({ isOpen, onClose, onAdd }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [addTimeSlot, { isLoading, isError }] = useAddTimeSlotMutation();

  if (!isOpen) return null;

  const handleAdd = async () => {
    // ✅ Validation
    if (!from || !to) {
      setError("Both From and To time are required.");
      return;
    }

    if (from >= to) {
      setError("From time must be earlier than To time.");
      return;
    }

    try {
      setError("");
      const today = new Date().toISOString().split("T")[0];
      const fromTimeISO = new Date(`${today}T${from}:00`).toISOString();
      const toTimeISO = new Date(`${today}T${to}:00`).toISOString();

      // ✅ Add new time slot to API
      await addTimeSlot({ fromTime: fromTimeISO, toTime: toTimeISO }).unwrap();

      // ✅ Show success message
      setMessage("Time slot added successfully!");
      setMessageType("success");

      // ✅ Clear inputs
      setFrom("");
      setTo("");

      // ✅ Trigger parent refresh if provided
      if (onAdd) onAdd();

      // ✅ Auto-hide message and close modal
      setTimeout(() => {
        setMessage("");
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Failed to add time slot:", err);
      setMessage("Failed to add time slot.");
      setMessageType("error");
    }
  };

  return (
    <>
      {/* ✅ Global Success/Error Message */}
      {message && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-2 rounded-lg text-white font-medium shadow-lg transition-all duration-500 ${
            messageType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message}
        </div>
      )}

      {/* ✅ Modal */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-xl shadow-xl w-[350px] p-5 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            <X size={20} />
          </button>

          {/* Title */}
          <h2 className="text-sm font-medium mb-3 text-black text-center">
            Select Time
          </h2>

          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-3 border p-3 rounded-lg">
            <div>
              <label className="text-xs text-black">From</label>
              <input
                type="time"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="text-xs text-black">To</label>
              <input
                type="time"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Error messages */}
          {error && (
            <p className="text-red-500 mt-2 text-center text-sm">{error}</p>
          )}
          {isError && (
            <p className="text-red-500 mt-2 text-center text-sm">
              Failed to add time slot
            </p>
          )}

          {/* Add Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleAdd}
              disabled={isLoading}
              className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Adding..." : "+ Add Slot"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeSlotPopup;
