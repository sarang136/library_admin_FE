import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const RevenueChart = () => {
  const [filter, setFilter] = useState("Yearly");

  const data = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 32000 },
    { month: "Mar", revenue: 24000 },
    { month: "Apr", revenue: 20000 },
    { month: "May", revenue: 16000 },
    { month: "Jun", revenue: 8000 },
    { month: "Jul", revenue: 12000 },
    { month: "Aug", revenue: 18000 },
    { month: "Sep", revenue: 22000 },
    { month: "Oct", revenue: 40000 },
    { month: "Nov", revenue: 20000 },
    { month: "Dec", revenue: 32000 },
  ];

  return (
    <div className="p-4 rounded-xl shadow-md bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-gray-800 font-semibold text-md">
          Total Revenue Statistics
        </h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-2 py-1 border rounded-md text-gray-600 text-sm focus:outline-none"
        >
          <option>Yearly</option>
          <option>Monthly</option>
          <option>Weekly</option>
        </select>
      </div>

      {/* Chart */}
      <div className="w-full h-56">
        <ResponsiveContainer>
          <BarChart data={data} barSize={30}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip />
            <Bar
              dataKey="revenue"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
              opacity={0.3}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
