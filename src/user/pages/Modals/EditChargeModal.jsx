import React, { useState, useEffect } from "react";
import { useEditChargesMutation } from "../../../redux/api/Chargeapi";
// import { useEditChargesMutation } from "../../../redux/apiSlice"; 

const EditChargeModal = ({ isOpen, onClose, charge }) => {
  const [selectedType, setSelectedType] = useState("");
  const [price, setPrice] = useState("");
  const [slot, setSlot] = useState("");

  const [editCharge, { isLoading }] = useEditChargesMutation();

  // Populate modal fields when charge is selected
  useEffect(() => {
    if (charge) {
      setSelectedType(charge.type.toLowerCase());
      setPrice(charge.price || "");
      setSlot(charge.slot || "");
    }
  }, [charge]);

  if (!isOpen) return null;

  const handleEdit = async () => {
    if (!selectedType || !price) {
      return alert("Please fill all fields");
    }
    if (!charge?._id) {
      return alert("Charge ID missing!");
    }

    // Send 'id' separately for RTK Query URL, body contains other fields
    const payload = {
      id: charge._id,
      type: selectedType === "registration" ? "Registeration" : "Admission",
      price: Number(price),
      ...(selectedType === "admission" && slot ? { slot } : {}),
    };

    try {
      await editCharge(payload).unwrap();
      alert("Charge updated successfully!");
      onClose();
    } catch (err) {
      console.error("Error updating charge:", err);
      alert("Failed to update charge.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-72 relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        {/* Type dropdown */}
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="registration">Registration</option>
          <option value="admission">Admission</option>
        </select>

        {/* Price input */}
        <input
          type="number"
          placeholder="Price"
          className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Slot dropdown (only for Admission) */}
        {selectedType === "admission" && (
          <select
            className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
          >
            <option value="">Select Slot</option>
            <option value="10:00 am - 10:00 pm">10:00 am - 10:00 pm</option>
            <option value="6:00 am - 2:00 pm">6:00 am - 2:00 pm</option>
          </select>
        )}

        {/* Save button */}
        <button
          onClick={handleEdit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditChargeModal;
