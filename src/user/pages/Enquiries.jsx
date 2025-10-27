import React, { useState } from "react";
import { useGetAllEnquiriesQuery } from "../../Redux/Api/EnquiryApi";

const Enquiries = () => {
  const [activeTab, setActiveTab] = useState("all");

  // ✅ Fetch enquiries
  const { data, isLoading, isError } = useGetAllEnquiriesQuery();

  // ✅ Extract array safely from backend structure
  const enquiries = Array.isArray(data)
    ? data
    : data?.data || data?.enquiries || [];

  console.log("📩 API Response:", data);
  console.log("📋 Parsed Enquiries:", enquiries);

  // ✅ Filter data by tab (all / answered / pending)
  const filteredData = enquiries.filter((item) => {
    const hasAnswer = item.answer && item.answer.trim() !== "";
    if (activeTab === "answered") return hasAnswer;
    if (activeTab === "pending") return !hasAnswer;
    return true;
  });

  // ✅ Loading & Error states
  if (isLoading)
    return <p className="text-center py-10 text-gray-500">Loading enquiries...</p>;

  if (isError)
    return <p className="text-center py-10 text-red-500">Failed to load enquiries.</p>;

  // ✅ Main UI
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="w-full mx-auto bg-white p-4 rounded-lg shadow-sm">
        {/* Tabs */}
        <div className="flex gap-6 border-b pb-2 mb-4 overflow-x-auto text-sm md:text-base">
          {["all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 whitespace-nowrap capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 font-medium text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab === "all"
                ? "All Enquiries"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                <th className="py-3 px-4 w-1/6">Name</th>
                <th className="py-3 px-4 w-1/6">Contact / Email</th>
                <th className="py-3 px-4 w-1/4">Query</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b last:border-none text-sm text-gray-800"
                  >
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">
                      {item.contact}
                      <br />
                      <span className="text-xs text-gray-500">
                        {item.email || "-"}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.query}</td>
                 
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500 italic"
                  >
                    No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="space-y-4 md:hidden">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg p-4 shadow-sm bg-gray-50 text-sm"
              >
                <p>
                  <span className="font-medium">Name:</span> {item.name}
                </p>
                <p>
                  <span className="font-medium">Contact:</span> {item.contact}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {item.email || "-"}
                </p>
                <p>
                  <span className="font-medium">Query:</span> {item.query}
                </p>
                <p className="mt-2">
                  <span className="font-medium">Answer:</span>{" "}
                  {item.answer && item.answer.trim() !== ""
                    ? item.answer
                    : "Pending reply"}
                </p>
                <div className="mt-3">
                  {item.answer && item.answer.trim() !== "" ? (
                    <span className="text-green-600 cursor-pointer font-medium">
                      Edit
                    </span>
                  ) : (
                    <span className="text-blue-600 cursor-pointer font-medium">
                      Reply
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-6 text-gray-500 italic">
              No enquiries found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
