import React, { useState, useEffect } from "react";
import { useEditStaffMutation } from "../../Redux/Api/StaffApi";

const EditStaffPopup = ({ isOpen, staff, onClose }) => {
  const [role, setRole] = useState("");
  const [editStaff, { isLoading }] = useEditStaffMutation();

  useEffect(() => {
    if (staff) setRole(staff.role || "");
  }, [staff]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!role) return alert("Role cannot be empty!");
    try {
      await editStaff({ staffId: staff._id, role }).unwrap();
      alert("Staff role updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update staff role!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80 relative">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Edit Staff Role</h2>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          className="w-full p-2 mb-5 border rounded bg-gray-100 focus:outline-none"
        />
        <div className="flex justify-between">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`px-6 py-2 font-semibold rounded-md ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStaffPopup;
