import React from "react";
import { FaUserLock } from "react-icons/fa";

const ProfilePopup = ({ isOpen }) => {
  if (!isOpen) return null;

  // Get admin data from localStorage
  const admin = JSON.parse(localStorage.getItem("admin"));
  console.log(admin)

  const formattedDate = admin?.createdAt
    ? new Date(admin.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="absolute right-4 top-14 w-80 bg-white shadow-xl rounded-xl overflow-hidden z-50 p-6 text-center">
      {/* Profile Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <FaUserLock className="w-8 h-8 text-blue-600" />
        </div>
      </div>

      {/* User Info */}
      <h2 className="text-lg font-semibold text-gray-800">
        {admin?.name || "Admin Name"}
      </h2>
      <p className="text-sm text-gray-500">{admin?.email || "email@example.com"}</p>

      {/* Account Created */}
      <p className="mt-6 text-xs text-gray-400">
        Account Created on {formattedDate}
      </p>
    </div>
  );
};

export default ProfilePopup;
