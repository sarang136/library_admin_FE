import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const FeesCollectionBar = () => {
  const feesData = [
    { month: "Jan", fees: 5 },
    { month: "Feb", fees: 15 },
    { month: "Mar", fees: 10 },
    { month: "Apr", fees: 8 },
    { month: "May", fees: 12 },
    { month: "Jun", fees: 6 },
    { month: "Jul", fees: 9 },
    { month: "Aug", fees: 14 },
    { month: "Sep", fees: 16 },
    { month: "Oct", fees: 20 },
    { month: "Nov", fees: 18 },
    { month: "Dec", fees: 22 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-md text-sm">
          <p className="font-semibold text-gray-700">{label}</p>
          <p className="text-blue-600 font-medium">{`Fees: $${payload[0].value}K`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 flex-1 shadow-sm hover:shadow-md transition-all duration-300">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Fees Collection Statistics
      </h2>
      <ResponsiveContainer width="100%" height={270}>
        <BarChart
          data={feesData}
          margin={{ top: 10, right: 25, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 13, fill: "#4b5563" }} />
          <YAxis
            ticks={[0, 5, 10, 15, 20, 25]}
            tickFormatter={(value) => `${value}K`}
            tick={{ fontSize: 13, fill: "#4b5563" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="fees"
            fill="#4f46e5"
            radius={[6, 6, 0, 0]}
            barSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeesCollectionBar;
