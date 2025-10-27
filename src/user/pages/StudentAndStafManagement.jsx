import React, { useState, useMemo } from "react";
import { Trash2, Plus, Edit2 } from "lucide-react";
import StaffPopup from "../pages/Modals/AddStaffPopup";
import EditStaffPopup from "../components/EditStaffPopUp";
import {
  useGetStaffQuery,
  useDeleteStaffMutation,
} from "../../Redux/Api/StaffApi";
import { useGetAllStudentsQuery } from "../../Redux/Api/StudentApi";

const StudentAndStaffManagement = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [studentStatus, setStudentStatus] = useState("active");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);


  const {
    data: studentsData,
    isLoading: isStudentsLoading,
    isError: isStudentsError,
    error: studentError,
  } = useGetAllStudentsQuery();
  const allStudents = studentsData?.data || [];

  const students = useMemo(() => {
    return allStudents.filter((student) =>
      studentStatus === "active" ? student.isApproved : !student.isApproved
    );
  }, [allStudents, studentStatus]);


  const {
    data: staffData,
    isLoading: isStaffLoading,
    isError: isStaffError,
    error: staffError,
  } = useGetStaffQuery();
  const staff = staffData?.data || [];

  const [deleteStaff, { isLoading: isDeleting }] = useDeleteStaffMutation();

  const headers =
    activeTab === "students"
      ? ["Student ID", "Name", "Email", "Contact No", "Status", "Created At"]
      : ["Staff ID", "Name", "Contact No", "Role", "Actions"];

  const data = activeTab === "students" ? students : staff;

  const handleDelete = async (staffId) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;
    try {
      await deleteStaff(staffId).unwrap();
      alert("Staff deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete staff!");
    }
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setShowEditPopup(true);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 flex justify-center items-start text-gray-800 bg-gray-50">
      <div className="w-full max-w-6xl rounded-lg ">
        <div className="flex flex-wrap justify-between items-center  border-b p-2 gap-2 bg-transparent">
          <div className="flex flex-wrap gap-2 items-center bg-[#0073FF0F] p-2 rounded-lg">
            <button
              className={`px-6 py-2 rounded-t-lg ${activeTab === "students"
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-700"
                }`}
              onClick={() => setActiveTab("students")}
            >
              Students ({students.length})
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg ${activeTab === "staff"
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-700"
                }`}
              onClick={() => setActiveTab("staff")}
            >
              Staff ({staff.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "students" && (
              <div className="relative">
                <select
                  value={studentStatus}
                  onChange={(e) => setStudentStatus(e.target.value)}
                  className="appearance-none  text-black px-3 py-2 rounded-md pr-8 cursor-pointer bg-[#0073FF0F]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                  ▼
                </span>
              </div>
            )}

            {activeTab === "staff" && (
              <button
                onClick={() => setShowAddPopup(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                <Plus size={18} /> Add Staff
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-b-lg  overflow-x-auto">
          <div className="hidden sm:block">
            {activeTab === "students" ? (
              isStudentsLoading ? (
                <div className="p-4 text-center text-gray-500">
                  Loading students...
                </div>
              ) : isStudentsError ? (
                <div className="p-4 text-center text-red-500">
                  {studentError?.message || "Failed to load students"}
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
                  <thead className="bg-blue-100">
                    <tr>
                      {headers.map((h, i) => (
                        <th
                          key={i}
                          className="px-3 sm:px-6 py-2 text-left text-xs sm:text-sm text-gray-500 uppercase whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y">
                    {students.length > 0 ? (
                      students.map((student) => (
                        <tr key={student._id}>
                          <td className="px-3 sm:px-6 py-2">
                            #{student._id ? student._id.slice(-6) : ""}
                          </td>
                          <td className="px-3 sm:px-6 py-2">{student.name}</td>
                          <td className="px-3 sm:px-6 py-2">{student.email}</td>
                          <td className="px-3 sm:px-6 py-2">
                            {student.contact}
                          </td>
                          <td className="px-3 sm:px-6 py-2">
                            {student.isApproved ? "Active" : "Inactive"}
                          </td>
                          <td className="px-3 sm:px-6 py-2">
                            {new Date(student.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={headers.length}
                          className="p-4 text-center text-gray-500"
                        >
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )
            ) : isStaffLoading ? (
              <div className="p-4 text-center text-gray-500">
                Loading staff...
              </div>
            ) : isStaffError ? (
              <div className="p-4 text-center text-red-500">
                {staffError?.message || "Failed to load staff"}
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
                <thead className="bg-blue-100">
                  <tr>
                    {headers.map((h, i) => (
                      <th
                        key={i}
                        className="px-3 sm:px-6 py-2 text-left text-xs sm:text-sm text-gray-500 uppercase whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y">
                  {staff.length > 0 ? (
                    staff.map((row) => (
                      <tr key={row._id}>
                        <td className="px-3 sm:px-6 py-2">
                            #{row._id ? row._id.slice(-6) : ""}
                          </td>
                        <td className="px-3 sm:px-6 py-2">{row.name}</td>
                        <td className="px-3 sm:px-6 py-2">{row.contact}</td>
                        <td className="px-3 sm:px-6 py-2">{row.role}</td>
                        <td className="px-3 sm:px-6 py-2 flex gap-2 justify-end">
                          <button
                            onClick={() => handleEdit(row)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(row._id)}
                            className="text-red-500 hover:text-red-700"
                            disabled={isDeleting}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={headers.length}
                        className="p-4 text-center text-gray-500"
                      >
                        No staff found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className="sm:hidden flex flex-col gap-3 p-4">
            {data.length > 0 ? (
              data.map((row) => (
                <div
                  key={row._id}
                  className="bg-gray-50 rounded-lg p-4 shadow flex flex-col gap-2"
                >
                  {activeTab === "students" ? (
                    <>
                      <p>
                        <span className="font-semibold">ID:</span> {row._id}
                      </p>
                      <p>
                        <span className="font-semibold">Name:</span> {row.name}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {row.email}
                      </p>
                      <p>
                        <span className="font-semibold">Contact:</span>{" "}
                        {row.contact}
                      </p>
                      <p>
                        <span className="font-semibold">Status:</span>{" "}
                        {row.isApproved ? "Active" : "Inactive"}
                      </p>
                      <p>
                        <span className="font-semibold">Created At:</span>{" "}
                        {new Date(row.createdAt).toLocaleDateString()}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <span className="font-semibold">ID:</span> {row._id}
                      </p>
                      <p>
                        <span className="font-semibold">Name:</span> {row.name}
                      </p>
                      <p>
                        <span className="font-semibold">Contact:</span>{" "}
                        {row.contact}
                      </p>
                      <p>
                        <span className="font-semibold">Role:</span> {row.role}
                      </p>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">No data found</div>
            )}
          </div>
        </div>

        {/* Popups */}
        <StaffPopup
          isOpen={showAddPopup}
          onClose={() => setShowAddPopup(false)}
        />
        <EditStaffPopup
          isOpen={showEditPopup}
          onClose={() => setShowEditPopup(false)}
          staff={selectedStaff}
        />
      </div>
    </div>
  );
};

export default StudentAndStaffManagement;
