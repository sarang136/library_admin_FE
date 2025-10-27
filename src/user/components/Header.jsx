import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import NotificationPopup from "../components/Notificationpopup";
import ProfilePopup from "../components/ProfilePopup";

const Header = ({ onToggleSidebar }) => {
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const admin = useSelector((state) => state.auth.admin);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const titles = {
    "/dash": "Dashboard",
    "/seatmanagement": "Seat Management",
    "/attendancemanagement": "Attendance Management",
    "/feesmanagement": "Fees Management",
    "/studentandstaffmanagement": "Student & Staff Management",
    "/addmissionmanagement": "Addmission Management",
    "/financemanagement": "Finance Management",
    "/enquiry": "Enquiries",
    "/about": "About Us",
    "/term": "Terms And Conditions",
    "/gallery": "Update Gallery",
    "/products": "Products",
    "/booking": "Booking Details",
    "/bookingdetails": "Seat Management",
    "/onwait": "on Waiting Students",
    "/charges": "Update Fees and Charges",
  };

  const pageTitle = titles[location.pathname] || "Dashboard";

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md text-black  ">
      {/* Top Row */}
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onToggleSidebar}
            className="text-white bg-blue-500 rounded-full p-2 text-2xl flex-shrink-0"
          >
            <HiMenuAlt2 />
          </button>
          <h1 className="text-lg sm:text-xl font-bold truncate">{pageTitle}</h1>
        </div>

        {/* Right-side items (desktop) */}
        <div className="hidden sm:flex items-center gap-6">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setShowNotif(!showNotif);
                setShowProfile(false);
              }}
              className="relative cursor-pointer bg-blue-500 text-white p-2 rounded-full"
            >
              <IoNotificationsSharp className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </button>
            <NotificationPopup isOpen={showNotif} onClose={() => setShowNotif(false)} />
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotif(false);
              }}
              className="cursor-pointer bg-blue-500 text-white p-2 rounded-full"
            >
              <FaUserCircle className="w-6 h-6" />
            </button>
            <ProfilePopup isOpen={showProfile} admin={admin} onClose={() => setShowProfile(false)} />
          </div>

          {/* Logo */}
          <div className="w-20 h-16 p-1 flex items-center justify-center bg-white overflow-hidden flex-shrink-0">
            <img src="/logo.png" alt="Company Logo" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      {/* Mobile Row */}
      <div className="flex sm:hidden items-center justify-between px-3 pb-3 gap-3">
        <div className="flex-1 flex items-center justify-start">
          <img src="/logo.png" alt="Company Logo" className="w-24 h-12 object-contain" />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotif(!showNotif);
              setShowProfile(false);
            }}
            className="relative cursor-pointer bg-blue-500 text-white p-2 rounded-full"
          >
            <IoNotificationsSharp className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
          <NotificationPopup isOpen={showNotif} onClose={() => setShowNotif(false)} />
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotif(false);
            }}
            className="cursor-pointer bg-blue-500 text-white p-2 rounded-full"
          >
            <FaUserCircle className="w-6 h-6" />
          </button>
          <ProfilePopup isOpen={showProfile} admin={admin} onClose={() => setShowProfile(false)} />
        </div>
      </div>
    </header>
  );
};

export default Header;
