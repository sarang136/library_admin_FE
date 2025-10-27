// Profile.jsx
import React from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const Profile = ({ onClose }) => {
    return (
        <div className="w-80 h-full bg-white shadow-lg flex flex-col p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Profile</h2>
                <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-900 font-bold"
                >
                    X
                </button>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500">
                    <FaUser />
                </div>
                <p className="font-semibold">John Doe</p>
                <p className="text-gray-500 text-sm">johndoe@example.com</p>
            </div>

            {/* Profile Actions */}
            <div className="flex flex-col gap-2">
                <button className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                    <FaUser /> My Profile
                </button>
                <button className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-red-600">
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
