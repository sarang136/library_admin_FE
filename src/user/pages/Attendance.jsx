import React, { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const AttendancePage2 = () => {
    const [date, setDate] = useState(new Date());

    // Sample bar chart data (monthly stats like in screenshot)
    const attendanceData = [
        { month: "Jan", present: 2, absent: 1 },
        { month: "Feb", present: 6, absent: 4 },
        { month: "Mar", present: 5, absent: 3 },
        { month: "Apr", present: 3, absent: 3 },
        { month: "May", present: 4, absent: 2 },
        { month: "Jun", present: 2, absent: 1 },
        { month: "Jul", present: 3, absent: 2 },
        { month: "Aug", present: 5, absent: 2 },
        { month: "Sep", present: 6, absent: 6 },
        { month: "Oct", present: 4, absent: 3 },
        { month: "Nov", present: 5, absent: 2 },
        { month: "Dec", present: 6, absent: 4 },
    ];

    return (
        <div className="grid grid-cols-3 gap-6 p-6">
            {/* Left: Attendance History */}
            <div className="col-span-2 bg-white rounded-xl shadow p-4 border">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold">My Attendance History</h2>
                    <div className="flex items-center space-x-2 text-blue-600 font-medium cursor-pointer">
                        <span className="material-icons">calendar_month</span>
                        <span>September</span>
                    </div>
                </div>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-600 border-b">
                            <th className="py-2 text-left">Day</th>
                            <th className="text-left">Check In</th>
                            <th className="text-left">Check Out</th>
                            <th className="text-left">Hours</th>
                            <th className="text-left">Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-2">17 Sept 2025</td>
                            <td>1:20 PM</td>
                            <td>02:20 PM</td>
                            <td>1 h</td>
                            <td className="text-green-600 font-medium">Present</td>
                        </tr>
                        <tr className="border-b">
                            <td>18 Sept 2025</td>
                            <td>00:00 PM</td>
                            <td>00:00 PM</td>
                            <td>0 h</td>
                            <td className="text-red-600 font-medium">Absent</td>
                        </tr>
                        <tr className="border-b">
                            <td>18 Sept 2025</td>
                            <td>00:00 PM</td>
                            <td>00:00 PM</td>
                            <td>0 h</td>
                            <td className="text-red-600 font-medium">Absent</td>
                        </tr>
                        {[...Array(5)].map((_, i) => (
                            <tr key={i} className="border-b">
                                <td>17 Sept 2025</td>
                                <td>1:20 PM</td>
                                <td>02:20 PM</td>
                                <td>1 h</td>
                                <td className="text-green-600 font-medium">Present</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Right: Statistics + Calendar */}
            {/* Right Section (Calendar + Legend separate) */}
            <div className="space-y-6">
                {/* Statistics card */}
                <div className="bg-blue-50 rounded-xl shadow p-4">
                    <h2 className="font-semibold mb-3">Statistics</h2>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                        <h3 className="text-sm font-medium mb-2">Attendance statistics</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart
                                data={[
                                    { month: "Jan", present: 2, absent: 1 },
                                    { month: "Feb", present: 6, absent: 4 },
                                    { month: "Mar", present: 5, absent: 3 },
                                    { month: "Apr", present: 3, absent: 3 },
                                    { month: "May", present: 4, absent: 2 },
                                    { month: "Jun", present: 2, absent: 1 },
                                    { month: "Jul", present: 3, absent: 2 },
                                    { month: "Aug", present: 5, absent: 2 },
                                    { month: "Sep", present: 6, absent: 6 },
                                    { month: "Oct", present: 4, absent: 3 },
                                    { month: "Nov", present: 5, absent: 2 },
                                    { month: "Dec", present: 6, absent: 4 },
                                ]}
                            >
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="present" fill="#22c55e" />
                                <Bar dataKey="absent" fill="#ef4444" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Calendar + Legend side by side as separate cards */}
                <div className="flex gap-4">
                    {/* Calendar card */}
                    <div className="flex-1 bg-blue-50 rounded-xl shadow p-4">
                        <h2 className="font-semibold mb-3">January</h2>
                        <div className="grid grid-cols-7 gap-2 text-center text-gray-700 text-sm">
                            {["m", "t", "w", "t", "f", "s", "s"].map((d, i) => (
                                <div key={`w-${i}`} className="font-medium">
                                    {d}
                                </div>
                            ))}
                            {Array.from({ length: 31 }, (_, i) => (
                                <div
                                    key={`d-${i}`}
                                    className={`py-1 rounded ${i + 1 === 2 ? "bg-blue-500 text-white font-bold" : ""
                                        }`}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legend card */}
                    <div className=" rounded-xl shadow flex flex-col  space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            <span className="text-xs">Present 20%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            <span className="text-xs">Absent 20%</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default AttendancePage2;
