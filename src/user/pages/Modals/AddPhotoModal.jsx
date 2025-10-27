import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useAddImageMutation } from "../../../Redux/Api/ImageApi";

const AddPhotoModal = ({ isOpen, onClose }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const [addImage, { isLoading }] = useAddImageMutation();

  if (!isOpen) return null;

  // Handle image selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  // Handle caption change with real-time validation
  const handleCaptionChange = (value) => {
    setCaption(value);
    if (errors.caption) setErrors((prev) => ({ ...prev, caption: "" }));
  };

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!caption.trim()) newErrors.caption = "Caption is required";
    else if (caption.trim().length < 3)
      newErrors.caption = "Caption must be at least 3 characters";

    if (!image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("caption", caption.trim());
    formData.append("imageUrl", image);

    try {
      const result = await addImage(formData).unwrap();
      alert(result?.message || "Image uploaded successfully!");

      // Reset fields
      setCaption("");
      setImage(null);
      setErrors({});

      // Close modal
      onClose();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(error?.data?.message || "Failed to upload image. Please try again.");
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

        {/* Caption Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-1">Caption</label>
          <input
            type="text"
            placeholder="Enter caption"
            value={caption}
            onChange={(e) => handleCaptionChange(e.target.value)}
            className={`w-full px-3 py-2 rounded-md focus:outline-none ${
              errors.caption ? "border border-red-500" : "bg-gray-100"
            }`}
          />
          {errors.caption && <p className="text-red-500 text-xs mt-1">{errors.caption}</p>}
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-1">Image</label>
          <label className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer py-10 ${
            errors.image ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-100"
          }`}>
            {image ? (
              <span className="text-sm text-gray-600">{image.name}</span>
            ) : (
              <div className="flex flex-col items-center">
                <FiUpload className="text-2xl text-gray-500 mb-2" />
                <span className="text-sm text-gray-600">Upload Here</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            } text-white font-medium px-6 py-2 rounded-md`}
          >
            {isLoading ? "Uploading..." : "+ Add Photo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPhotoModal;
