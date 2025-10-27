import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import AddUpdateModal from "./Modals/AddUpdatemodal";
import EditUpdateModal from "./Modals/EditUpdatemodal";
import AddPhotoModal from "./Modals/AddPhotoModal";
import EditPhotoModal from "./Modals/EditPhotoModal";
import {
  useGetAllUpdatesQuery,
  useDeleteUpdateMutation,
} from "../../Redux/Api/UpdateApi";
import {
  useGetImagesQuery,
  useDeleteImageMutation,
} from "../../Redux/Api/ImageApi";

// Shimmer loader
const Shimmer = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const ViewImageModal = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-[90%] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
        >
          ✕
        </button>
        {image?.imageUrl ? (
          <img
            src={image.imageUrl}
            alt={image.caption || "Image"}
            className="w-full max-h-[70vh] object-contain bg-black"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <div className="p-4 text-center">
          <h3 className="text-gray-800 font-semibold">
            {image?.caption || "Untitled"}
          </h3>
        </div>
      </div>
    </div>
  );
};

const UpdatesGallery = () => {
  const [activeTab, setActiveTab] = useState("updates");


  const {
    data: updatesData,
    isLoading: isUpdatesLoading,
    isError: isUpdatesError,
    refetch: refetchUpdates,
  } = useGetAllUpdatesQuery();
  const [deleteUpdate] = useDeleteUpdateMutation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEditUpdateModalOpen, setIsEditUpdateModalOpen] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  const {
    data: galleryData,
    isLoading: isImagesLoading,
    isError: isImagesError,
    refetch: refetchImages,
  } = useGetImagesQuery();
  const [deleteImage] = useDeleteImageMutation();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isViewImageModalOpen, setIsViewImageModalOpen] = useState(false);
  const [selectedViewImage, setSelectedViewImage] = useState(null);

  // Delete handlers
  const handleDeleteUpdate = async (id) => {
    if (window.confirm("Are you sure you want to delete this update?")) {
      try {
        await deleteUpdate(id).unwrap();
        alert("Update deleted successfully");
        refetchUpdates();
      } catch (err) {
        console.error(err);
        alert("Failed to delete update");
      }
    }
  };

  const handleDeleteImage = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteImage(id).unwrap();
        alert("Image deleted successfully");
        refetchImages();
      } catch (err) {
        console.error(err);
        alert("Failed to delete image");
      }
    }
  };

  const updates = Array.isArray(updatesData?.data) ? updatesData.data : [];
  const gallery = Array.isArray(galleryData?.data) ? galleryData.data : [];

  return (
    <div className="max-w-full p-4 sm:p-6 rounded-lg -mt-5 h-[calc(100vh-80px)] flex flex-col">

      <div className="sticky top-0 z-20 pb-4 mb-4 bg-white">
        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800 mb-2">
          📢 Updates & Gallery
        </h2>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          Manage announcements, events, and photo memories from one place.
        </p>

        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={() => setIsUpdateModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700 text-sm sm:text-base"
          >
            <MdAdd /> Add Update
          </button>
          <button
            onClick={() => setIsPhotoModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700 text-sm sm:text-base"
          >
            <MdAdd /> Add Photo
          </button>
        </div>

        <div className="flex gap-4 border-b mb-0 overflow-x-auto">
          <button
            className={`pb-2 font-semibold text-sm sm:text-base flex-shrink-0 ${
              activeTab === "updates"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("updates")}
          >
            Updates
          </button>
          <button
            className={`pb-2 font-semibold text-sm sm:text-base flex-shrink-0 ${
              activeTab === "photos"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("photos")}
          >
            Photos
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto mt-2 space-y-3">
        {/* Updates Tab */}
        {activeTab === "updates" && (
          <div className="space-y-3">
            {isUpdatesError && (
              <p className="text-red-600">Failed to load updates.</p>
            )}
            {isUpdatesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Shimmer key={i} className="h-24 w-full" />
              ))
            ) : updates.length === 0 ? (
              <p className="text-gray-500">No updates available.</p>
            ) : (
              updates.map((update) => (
                <div
                  key={update._id}
                  className="relative flex flex-col sm:flex-row bg-gray-100 p-4 rounded-md shadow-md min-h-[100px]"
                >
                  <div className="flex-1 pr-20">
                    <h3 className="text-gray-800 font-semibold break-words">
                      {update.title}
                    </h3>
                    <p className="text-gray-700 mt-1 break-words">
                      {update.description}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-3 p-2 z-10">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => {
                        setSelectedUpdate(update);
                        setIsEditUpdateModalOpen(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteUpdate(update._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "photos" && (
          <div>
            {isImagesError && (
              <p className="text-red-600">Error fetching images.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {isImagesLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <Shimmer key={i} className="h-40 w-full" />
                ))
              ) : gallery.length === 0 ? (
                <p className="text-gray-500 col-span-4 text-center">
                  No images available.
                </p>
              ) : (
                gallery.map((item) => (
                  <div
                    key={item._id}
                    className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md flex flex-col cursor-pointer"
                    onClick={() => {
                      setSelectedViewImage(item);
                      setIsViewImageModalOpen(true);
                    }}
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.caption || "Image"}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}

                    <div className="flex-1 p-3">
                      <h3 className="text-gray-800 font-medium break-words">
                        {item.caption || "Untitled"}
                      </h3>
                    </div>

                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 flex gap-2 bg-white p-2 rounded shadow-md z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => {
                          setSelectedImage(item);
                          setIsEditPhotoModalOpen(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteImage(item._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <AddUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        refetchUpdates={refetchUpdates}
      />
      <EditUpdateModal
        isOpen={isEditUpdateModalOpen}
        onClose={() => setIsEditUpdateModalOpen(false)}
        update={selectedUpdate}
        refetchUpdates={refetchUpdates}
      />
      <AddPhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        refetchImages={refetchImages}
      />
      <EditPhotoModal
        isOpen={isEditPhotoModalOpen}
        onClose={() => setIsEditPhotoModalOpen(false)}
        image={selectedImage}
        refetchImages={refetchImages}
      />
      <ViewImageModal
        isOpen={isViewImageModalOpen}
        onClose={() => setIsViewImageModalOpen(false)}
        image={selectedViewImage}
      />
    </div>
  );
};

export default UpdatesGallery;
