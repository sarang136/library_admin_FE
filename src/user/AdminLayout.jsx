import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-white relative">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Optional backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} />

        {/* Page content */}
        <main className="flex-1 bg-white p-6 md:-mt-7">
          <div className="max-w-screen-2xl mx-auto rounded-xl p-6 bg-gray-50 shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
