import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutAdminMutation } from "../../Redux/Api/AuthApi";
import {
  MdDashboard,
  MdLogout,
} from "react-icons/md";
import { GiCarSeat } from "react-icons/gi";
import { CiSettings } from "react-icons/ci";
import { RiMoneyRupeeCircleFill, RiQuestionnaireLine } from "react-icons/ri";
import { HiCalendarDays } from "react-icons/hi2";
import { FaMoneyBill, FaRegAddressBook } from "react-icons/fa";
import { GrGallery, GrMoney } from "react-icons/gr";
import { PiStudentDuotone } from "react-icons/pi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [logoutAdmin, { isLoading: isLoggingOut }] = useLogoutAdminMutation();

  const menuItems = [
    { name: "Admin Dashboard", path: "/", icon: <MdDashboard className="w-10 h-10 bg-blue-300 p-2 rounded-md text-blue-700" /> },
    { name: "Seat Management", path: "/seatmanagement", icon: <GiCarSeat className="w-10 h-10 bg-blue-300 p-2 rounded-md text-blue-700" /> },
    { name: "Attendance", path: "/attendancemanagement", icon: <HiCalendarDays className="w-10 h-10 bg-blue-300 p-2 rounded-md text-blue-700" /> },
    { name: "Fees & Payments", path: "/feesmanagement", icon: <RiMoneyRupeeCircleFill className="w-10 h-10 bg-blue-300 p-2 rounded-md text-blue-700" /> },
    { name: "Student & Staff", path: "/studentandstaffmanagement", icon: <PiStudentDuotone className="w-10 h-10 bg-blue-300 p-2 rounded-md text-blue-700" /> },
    { name: "Addmission Management", path: "/addmissionmanagement", icon: <FaRegAddressBook className="w-10 h-10 bg-blue-300 p-2 rounded-md text-blue-700" /> },
    { name: "Finance Management", path: "/financemanagement", icon: <GrMoney className="w-10 h-10 bg-blue-300 p-2 rounded-md text-blue-700" /> },
    { name: "Setting", path: "/setting", icon: <CiSettings className="w-10 h-10 bg-blue-300 p-2 rounded-md text-blue-700" /> },
    { name: "Enquiries", path: "/enquiry", icon: <RiQuestionnaireLine className="w-10 h-10 bg-blue-300 p-2 rounded-md text-blue-700" /> },
    { name: "Update Gallery", path: "/gallery", icon: <GrGallery className="w-10 h-10 bg-blue-300 p-2 rounded-md text-blue-700" /> },
    { name: "Update Fees and Charges", path: "/charges", icon: <FaMoneyBill className="w-10 h-10 bg-blue-300 p-2 rounded-md text-blue-700" /> },
    { name: "Logout", path: "/logout", icon: <MdLogout className="w-10 h-10 bg-red-300 p-2 rounded-md text-red-700" /> },
  ];

  const handleMenuClick = async (item) => {
    if (item.name === "Logout") {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        try {
          await logoutAdmin().unwrap();
          localStorage.removeItem("token");
          localStorage.removeItem("admin");
          navigate("/login", { replace: true });
        } catch (err) {
          console.error("Logout failed:", err);
          alert("Failed to logout. Try again.");
        }
      }
    } else {
      navigate(item.path);
    }
    toggleSidebar();
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 sm:w-72 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out rounded-r-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Logo */}
      <div className="sticky top-0 z-10 bg-white border-b border-blue-500 p-4 flex items-center justify-center">
        <img src="/logo.png" alt="Logo" className="w-24 h-auto object-contain" />
      </div>

      {/* Menu */}
      <ul className="flex flex-col gap-2 p-4 h-[calc(100%-80px)] overflow-y-auto">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className="cursor-pointer hover:bg-blue-100 rounded p-2 flex items-center gap-3 whitespace-nowrap"
            onClick={() => handleMenuClick(item)}
          >
            {item.icon}
            <span className="truncate">{item.name}</span>
            {item.name === "Logout" && isLoggingOut && (
              <span className="ml-auto text-xs text-gray-500">Logging out...</span>
            )}
          </li>
        ))}
      </ul>

      {/* Hide scrollbar but allow scroll */}
      <style>
        {`
          /* For Chrome, Safari, and Opera */
          ul::-webkit-scrollbar {
            width: 0px;
          }
          /* For IE, Edge */
          ul {
            -ms-overflow-style: none;
          }
          /* For Firefox */
          ul {
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
