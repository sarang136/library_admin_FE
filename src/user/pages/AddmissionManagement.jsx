// src/components/RequestManagement.jsx
import React, { useState, useEffect } from "react";
import { useGetAllBookingsQuery } from "../../Redux/Api/BookingApi";

const AdmissionManagement = () => {
  const [activeTab, setActiveTab] = useState("All Requests");

  const { data: apiResponse, error, isLoading } = useGetAllBookingsQuery();
  const bookings = apiResponse?.data || [];

  useEffect(() => {
    if (bookings.length) console.log("Fetched bookings:", bookings);
  }, [bookings]);

  // Determine booking status
  const getStatus = (booking) => {
    // Adjust according to your API fields if needed
    if (booking.status === "booked") return "Approved"; 
    if (booking.status === "pending") return "Pending";
    if (booking.status === "rejected") return "Rejected";
    return "Pending";
  };


  const getStatusClasses = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Pending":
        return "text-blue-600 ";
      case "Rejected":
        return "text-red-600 bg-red-50";
      default:
        return "";
    }
  };


  const filteredData =
    activeTab === "All Requests"
      ? bookings
      : bookings.filter((booking) => getStatus(booking) === activeTab);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error fetching data</div>;

  return (
    <div className="p-6 min-h-screen">
      {/* Tabs */}
      <div className="flex bg-[#0073FF0F] rounded-lg p-1 space-x-2 w-max mb-6 px-4 py-2">
        {["All Requests", "Pending", "Approved", "Rejected"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-5 rounded-md font-medium transition-colors duration-200 ${
              activeTab === tab
                ? "bg-blue-500 text-white shadow"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#0073FF0F]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((booking) => {
              const status = getStatus(booking);
              return (
                <tr key={booking._id}>
                   <td className="px-3 sm:px-6 py-2">
                            #{booking.userId ? booking.userId.slice(-6) : ""}
                          </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(booking.dob).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdmissionManagement;
