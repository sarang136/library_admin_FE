// src/components/Modals/EditPhotoModal.jsx
import React, { useState, useEffect } from "react";
import { useEditImageMutation } from "../../../Redux/Api/ImageApi";

const EditPhotoModal = ({ isOpen, onClose, image, refetchImages }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);

 
  const [editImage, { isLoading }] = useEditImageMutation();

  useEffect(() => {
    if (image) {
      setCaption(image.caption || "");
      setFile(null);
    }
  }, [image]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      if (file) formData.append("imageUrl", file); 
    
      await editImage({ id: image._id, formData }).unwrap();

      alert("Image updated successfully!");
      refetchImages?.(); 
      onClose(); 
    } catch (err) {
      console.error("Failed to edit image:", err);
      alert("Failed to edit image. Check server logs.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Photo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Caption Input */}
          <label className="flex flex-col gap-1">
            Caption
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border border-gray-300 p-2 rounded"
              placeholder="Enter caption"
              required
            />
          </label>

          {/* File Input */}
          <label className="flex flex-col gap-1">
            Replace Image
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              className="border border-gray-300 p-2 rounded"
            />
          </label>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPhotoModal;
