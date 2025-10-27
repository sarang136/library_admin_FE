import React from "react";
import { FaChevronRight, FaInfo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";   

const Setting = () => {
  const navigate = useNavigate();   

  const items = [
    { title: "About Us", path: "/about" },     
    { title: "Terms & Condition", path: "/term" },
    { title: "Fee Structure", path: "/fees" },
  ];

  return (
    <div className="min-h-screen p-6 flex ">
      <div className="w-full ">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white px-4 py-3 rounded-md shadow-sm mb-3 cursor-pointer "
            onClick={() => navigate(item.path)}  
          >
            <div className="flex items-center gap-3">
              {/* Blue rounded (i) icon */}
              <div className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">
                <FaInfo />
              </div>
              <span className="text-gray-800 font-medium">{item.title}</span>
            </div>
            <FaChevronRight className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Setting;
