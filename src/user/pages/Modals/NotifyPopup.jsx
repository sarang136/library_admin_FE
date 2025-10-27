import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const NotifyPopup = ({ isOpen, onClose, onSend, defaultMessage }) => {
  const [message, setMessage] = useState(defaultMessage || "");

  useEffect(() => {
    setMessage(defaultMessage || "");
  }, [defaultMessage]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
      <div className="bg-white rounded-xl shadow-xl w-[400px] p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={16} />
        </button>

        <h2 className="text-lg font-semibold mb-3 text-center text-gray-700">
          Send Notification
        </h2>

        <textarea
          rows="5"
          placeholder="Enter message to share"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleSend}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotifyPopup;
