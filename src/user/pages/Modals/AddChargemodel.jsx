import React, { useState, useEffect } from "react";
import { useAddChargesMutation, useGetChargesQuery } from "../../../redux/api/Chargeapi";

const AddChargeModal = ({ isOpen, onClose, onChargeAdded }) => {
  const [selectedType, setSelectedType] = useState("");
  const [price, setPrice] = useState("");
  const [slot, setSlot] = useState("");
  const [error, setError] = useState("");

  const [addCharges, { isLoading }] = useAddChargesMutation();
  const { data, isFetching } = useGetChargesQuery();

  // ✅ Normalize API response → always an array
  const charges = Array.isArray(data) ? data : data?.data || [];

  // ✅ Check existing charges
  const hasRegistration = charges.some(
    (c) => c.type?.toLowerCase() === "registeration"
  );
  const hasAdmission = charges.some(
    (c) => c.type?.toLowerCase() === "admission"
  );

  // Reset form whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedType("");
      setPrice("");
      setSlot("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAdd = async () => {
    setError(""); // reset error

    // ✅ Basic validations
    if (!selectedType) {
      return setError("Please select a type");
    }
    if (!price || Number(price) <= 0) {
      return setError("Please enter a valid price");
    }

    // ✅ Extra safety check
    const alreadyExists = charges.some(
      (c) =>
        c.type?.toLowerCase() ===
        (selectedType === "registration" ? "registeration" : "admission")
    );
    if (alreadyExists) {
      return setError(
        `${
          selectedType === "registration" ? "Registration" : "Admission"
        } charge already exists`
      );
    }

    const charge = {
      type: selectedType === "registration" ? "Registeration" : "Admission",
      price: Number(price),
      ...(selectedType === "admission" && slot ? { slot } : {}),
    };

    try {
      await addCharges(charge).unwrap();

      // Notify parent
      if (typeof onChargeAdded === "function") {
        onChargeAdded(charge);
      }

      // Reset & close
      setSelectedType("");
      setPrice("");
      setSlot("");
      onClose();
    } catch (err) {
      console.error("Error while adding charge:", err);
      setError("Allready exists.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-3">Add Charge</h2>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {/* Type Dropdown */}
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Select Type</option>
          {!hasRegistration && <option value="registration">Registration</option>}
          {!hasAdmission && <option value="admission">Admission</option>}
        </select>

        {/* Price Input */}
        <input
          type="number"
          placeholder="Price"
          className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Slot Dropdown (only for Admission) */}
        {/* {selectedType === "admission" && (
          <select
            className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
          >
            <option value="">Select Slot</option>
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
          </select>
        )} */}

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className={`w-full py-2 rounded-md text-white ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={isLoading || isFetching}
        >
          {isLoading ? "Adding..." : "+ Add"}
        </button>
      </div>
    </div>
  );
};

export default AddChargeModal;
