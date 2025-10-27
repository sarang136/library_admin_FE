import React, { useState } from "react";
import NotifyPopup from "../pages/Modals/NotifyPopup"; 

const Onwaiting = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleSendMessage = (message) => {
    console.log("Notification sent:", message);
    alert(`Notification sent: ${message}`);
  };

  const data = [
    {
      name: "John Doe",
      reservedSeat: "FR-15-21",
      contact: "8956589656",
      date: "2-08-2025 10:00 A.M",
      vacateDate: "25-08-2025",
      address: "Om Nagar, Someshwar Nagar",
      paymentStatus: "Unpaid",
      amount: "₹0",
    },
  ];

  return (
    <div className="p-6 min-h-screen flex -mt-3">
      <div className="bg-white rounded-2xl p-4 w-full max-w-6xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-blue-50">
              <tr className="text-left text-gray-700 text-sm">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Reserved Seat</th>
                <th className="px-4 py-3">Contact No</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Vacant Date</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Payment Status</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition text-sm"
                >
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.reservedSeat}</td>
                  <td className="px-4 py-3">{item.contact}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.vacateDate}</td>
                  <td className="px-4 py-3">{item.address}</td>
                  <td className="px-4 py-3">
                    <span className="text-red-500 font-medium">
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item.amount}</td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <button
                      onClick={handleOpenPopup}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Notify
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs">
                      Redeem
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Popup */}
      <NotifyPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSend={handleSendMessage}
      />
    </div>
  );
};

export default Onwaiting;
