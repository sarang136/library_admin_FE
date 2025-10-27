import React, { useState } from "react";
import { FaRupeeSign, FaTrashAlt, FaPen } from "react-icons/fa";
import AddChargeModal from "../pages/Modals/AddChargemodel";
import EditChargeModal from "../pages/Modals/EditChargeModal";
import { useGetChargesQuery, useDeleteChargesMutation } from "../../redux/api/Chargeapi";

const ChargesPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCharge, setSelectedCharge] = useState(null);

  // Fetch charges
  const { data, isLoading, isError } = useGetChargesQuery();
  const [deleteCharge] = useDeleteChargesMutation();

  if (isLoading) return <p className="p-5 text-gray-600">Loading charges...</p>;
  if (isError) return <p className="p-5 text-red-500">Failed to fetch charges.</p>;

  const chargesData = data?.charges || [];

  const handleEditClick = (charge) => {
    setSelectedCharge({ ...charge, id: charge.id || charge._id });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this charge?")) {
      try {
        await deleteCharge(id).unwrap();
        alert("Charge deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to delete charge.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5 sm:p-8">
      {/* Header */}
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition"
        >
          + Add Charges
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {chargesData.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl p-4 transition relative flex flex-col items-start shadow-md"
          >
            <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mb-3">
              <FaRupeeSign />
            </div>
            <h2 className="font-medium text-gray-800 text-sm sm:text-base">{item.type}</h2>
            <p className="text-green-600 text-lg font-semibold mt-1">
              ₹{Number(item.price).toLocaleString()}
            </p>

            <div className="absolute bottom-3 right-4 flex items-center gap-3">
              <button
                className="text-blue-500 hover:text-blue-600 text-sm"
                onClick={() => handleEditClick(item)}
              >
                <FaPen />
              </button>
              <button
                className="text-red-500 hover:text-red-600 text-sm"
                onClick={() => handleDeleteClick(item._id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <AddChargeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onChargeAdded={(newCharge) => {
          alert(`${newCharge.type} charge added!`);
        }}
      />

      <EditChargeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        charge={selectedCharge}
      />
    </div>
  );
};

export default ChargesPage;
