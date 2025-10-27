import React, { useEffect, useMemo, useState } from "react";
import {
  FaUserGraduate,
  FaUserTie,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetAllStudentsQuery } from "../../Redux/Api/StudentApi";
import { useGetStaffQuery } from "../../Redux/Api/StaffApi";
import { useGetAvailableSeatsQuery } from "../../Redux/Api/SeatApi";
import SeatspiChart from "./SeatspiChart.jsx";
import FeesCollectionBar from "./FeesCollectionBar.jsx";
import { useGetAllBookingsQuery } from "../../Redux/Api/BookingApi.js";

const ShimmerCard = ({ width = "full", height = "20" }) => (
  <div className={`bg-gray-200 animate-pulse rounded-2xl ${width} ${height}`} />
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const {
    data: seatData,
    isLoading: seatsLoading,
    isError: seatsError,
  } = useGetAvailableSeatsQuery();
  const { data: bookings } = useGetAllBookingsQuery();
  const {
    data: studentsData,
    isLoading: studentsLoading,
    isError: studentsError,
  } = useGetAllStudentsQuery();
  const {
    data: staffData,
    isLoading: staffLoading,
    isError: staffError,
  } = useGetStaffQuery();

  const loading = studentsLoading || staffLoading || seatsLoading;
  const error = studentsError || staffError || seatsError;

  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (seatData?.data) setSeats(seatData.data);
  }, [seatData]);

  const availableForMorning = seats.filter(
    (seat) =>
      seat?.bookedForMorning === false || seat?.bookedForMorning === null
  );
  const availableForEvening = seats.filter(
    (seat) =>
      seat?.bookedForEvening === false || seat?.bookedForEvening === null
  );
  const availableForFullDay = seats.filter(
    (seat) =>
      seat?.bookedForFullDay === false || seat?.bookedForFullDay === null
  );

  const total = bookings?.data?.reduce(
    (acc, books) => acc + (books?.amount || 0),
    0
  );

  const pending = seats.filter((seat) => seat?.status === "pending");
  const expired = seats.filter((seat) => seat?.status === "expired");

  const studentCount = useMemo(() => {
    if (!studentsData) return 0;
    if (Array.isArray(studentsData)) return studentsData.length;
    if (studentsData.students) return studentsData.students.length;
    if (studentsData.data) return studentsData.data.length;
    return 0;
  }, [studentsData]);

  const staffCount = useMemo(() => {
    if (!staffData) return 0;
    if (Array.isArray(staffData)) return staffData.length;
    if (staffData.staff) return staffData.staff.length;
    if (staffData.data) return staffData.data.length;
    return 0;
  }, [staffData]);

  const statsData = {
    students: studentCount,
    staff: staffCount,
    availableSeats: pending.length + expired.length,
    payment: total,
  };

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center text-lg text-red-500 ">
        <p className="font-semibold">Unable to load dashboard data.</p>
        <p className="text-gray-600 mt-2">
          Please check your network connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen -mt-6 rounded-2xl p-7 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {/* ✅ Cards Grid (3 on top, 3 below) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {/* Students */}
        <div
          className="bg-blue-100 rounded-2xl p-5 flex items-center cursor-pointer h-28"
          onClick={() => navigate("/studentandstaffmanagement")}
        >
          <div className="bg-blue-500 p-3 rounded-md mr-4">
            <FaUserGraduate className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm font-medium">Students</h2>
            <p className="text-xl font-bold text-gray-800">
              {statsData.students}
            </p>
          </div>
        </div>

        {/* Staff */}
        <div
          className="bg-yellow-100 rounded-2xl p-5 flex items-center cursor-pointer h-28"
          onClick={() => navigate("/studentandstaffmanagement")}
        >
          <div className="bg-yellow-500 p-3 rounded-md mr-4">
            <FaUserTie className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm font-medium">Staff</h2>
            <p className="text-xl font-bold text-gray-800">
              {statsData.staff}
            </p>
          </div>
        </div>

        {/* Available Seats (Morning) */}
        <div
          className="bg-orange-100 rounded-2xl p-5 flex items-center cursor-pointer h-28"
          onClick={() => navigate("/booking")}
        >
          <div className="bg-orange-500 p-3 rounded-md mr-4">
            <FaCheckCircle className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm font-medium">
              Seats (Morning)
            </h2>
            <p className="text-xl font-bold text-gray-800">
              {availableForMorning.length}
            </p>
          </div>
        </div>

        {/* Available Seats (Evening) */}
        <div
          className="bg-orange-100 rounded-2xl p-5 flex items-center cursor-pointer h-28"
          onClick={() => navigate("/booking")}
        >
          <div className="bg-orange-500 p-3 rounded-md mr-4">
            <FaCheckCircle className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm font-medium">
              Seats (Evening)
            </h2>
            <p className="text-xl font-bold text-gray-800">
              {availableForEvening.length}
            </p>
          </div>
        </div>

        {/* Available Seats (Full Day) */}
        <div
          className="bg-orange-100 rounded-2xl p-5 flex items-center cursor-pointer h-28"
          onClick={() => navigate("/booking")}
        >
          <div className="bg-orange-500 p-3 rounded-md mr-4">
            <FaCheckCircle className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm font-medium">
              Seats (Full Day)
            </h2>
            <p className="text-xl font-bold text-gray-800">
              {availableForFullDay.length}
            </p>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-green-100 rounded-2xl p-5 flex items-center h-28">
          <div className="bg-green-500 p-3 rounded-md mr-4">
            <FaMoneyBillWave className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm font-medium">Payment</h2>
            <p className="text-xl font-bold text-gray-800">
              ₹{statsData.payment}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        <SeatspiChart />
        <FeesCollectionBar />
      </div>
    </div>
  );
};

export default AdminDashboard;
