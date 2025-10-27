import React, { useState, useEffect } from "react";
import { useEditUpdateMutation } from "../../../Redux/Api/UpdateApi";

const EditUpdateModal = ({ isOpen, onClose, update }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editUpdate, { isLoading }] = useEditUpdateMutation();

  // Populate modal when the selected update changes
  useEffect(() => {
    if (update) {
      setTitle(update.title || "");
      setDescription(update.description || "");
    }
  }, [update]);

  if (!isOpen) return null; // Do not render if modal is closed

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Both title and description are required.");
      return;
    }
    try {
      await editUpdate({ id: update._id, data: { title, description } }).unwrap();
      alert("Update edited successfully");
      onClose();
    } catch (err) {
      console.error("Failed to edit update:", err);
      alert("Failed to edit update");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Update</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-3"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2 w-full h-24 resize-none"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUpdateModal;
