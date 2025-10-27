import React, { useState } from "react";
import { useAddStaffMutation } from "../../../Redux/Api/StaffApi";

const StaffPopup = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("");

  const [errors, setErrors] = useState({}); // Inline validation

  const [addStaff, { isLoading }] = useAddStaffMutation();

  if (!isOpen) return null;

  // Field-level validation
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        if (!value) return "Name is required.";
        if (!/^[A-Za-z\s]+$/.test(value))
          return "Name can only contain letters and spaces.";
        return "";
      case "contact":
        if (!value) return "Contact number is required.";
        if (!/^\d{10}$/.test(value))
          return "Contact number must be exactly 10 digits.";
        return "";
      case "role":
        if (!value) return "Role is required.";
        if (!/^[A-Za-z\s]+$/.test(value))
          return "Role can only contain letters and spaces.";
        return "";
      default:
        return "";
    }
  };

  const handleSubmit = async () => {
    // Validate all fields
    const newErrors = {
      name: validateField("name", name),
      contact: validateField("contact", contact),
      role: validateField("role", role),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) return;

    try {
      await addStaff({ name, contact, role }).unwrap();
      alert("Staff added successfully!");
      setName("");
      setContact("");
      setRole("");
      setErrors({});
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add staff!");
    }
  };

const handleChange = (field, value) => {
  switch (field) {
    case "name":
      if (/^[A-Za-z\s]*$/.test(value)) setName(value);
      break;
    case "contact":
      // Allow only digits, max 10
      if (/^\d*$/.test(value)) setContact(value.slice(0, 10));
      break;
    case "role":
      if (/^[A-Za-z\s]*$/.test(value)) setRole(value);
      break;
    default:
      break;
  }

  // Validate this field dynamically using updated value
  const error = validateField(field, 
    field === "contact" ? value.slice(0, 10) : value
  );
  setErrors((prev) => ({
    ...prev,
    [field]: error || "",
  }));
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Add Staff</h2>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Contact No"
            value={contact}
            onChange={(e) => handleChange("contact", e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
          />
          {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
        </div>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
          />
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            + Add Staff
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default StaffPopup;
