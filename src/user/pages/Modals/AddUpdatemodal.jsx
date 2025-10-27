import React, { useState } from "react";
import { useAddUpdateMutation } from "../../../Redux/Api/UpdateApi";

const AddUpdateModal = ({ isOpen, onClose, refetchUpdates }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const [addUpdate, { isLoading }] = useAddUpdateMutation();

  if (!isOpen) return null;

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Title validations
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    // Description validations
    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(description.trim())) {
      newErrors.description = "Description must contain only letters and spaces";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUpdate = async () => {
    if (!validate()) return;

    try {
      await addUpdate({
        title: title.trim(),
        description: description.trim(),
      }).unwrap();

      alert("Update added successfully!");

      if (typeof refetchUpdates === "function") refetchUpdates();

      setTitle("");
      setDescription("");
      setErrors({});
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to add update");
    }
  };

  // Real-time error handling
  const handleTitleChange = (value) => {
    setTitle(value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: "" }));
    }
  };

  const handleDescriptionChange = (value) => {
    // ✅ Allow only alphabets and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setDescription(value);
      if (errors.description) {
        setErrors((prev) => ({ ...prev, description: "" }));
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        description: "Only letters and spaces are allowed",
      }));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[350px] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">Add Update</h2>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={`w-full px-3 py-2 rounded-md focus:outline-none ${
              errors.title ? "border border-red-500" : "bg-gray-100"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className={`w-full px-3 py-2 rounded-md focus:outline-none ${
              errors.description ? "border border-red-500" : "bg-gray-100"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAddUpdate}
            disabled={isLoading}
            className={`${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white px-6 py-2 rounded-md`}
          >
            {isLoading ? "Adding..." : "+ Add Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateModal;
