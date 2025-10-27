// src/components/FinanceDashboard.jsx

import React from 'react';
import { FaMoneyBillWave, FaCoins, FaHandHoldingUsd } from 'react-icons/fa'; // Importing icons

// Dummy data for the transaction history table
const transactionHistoryData = [
  {
    studentId: 'stud213',
    name: 'John Doe',
    contactNo: '8585858585',
    date: '20/08/2025',
    paymentMethod: 'UPI',
    amount: '₹2000',
  },
  {
    studentId: 'stud214',
    name: 'Jane Smith',
    contactNo: '9876543210',
    date: '19/08/2025',
    paymentMethod: 'Card',
    amount: '₹1500',
  },
  {
    studentId: 'stud215',
    name: 'Mike Johnson',
    contactNo: '7654321098',
    date: '18/08/2025',
    paymentMethod: 'Cash',
    amount: '₹500',
  },
];

const FeesManagement = () => {
  return (
    <div className="p-6  min-h-screen ">
      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Amount Card */}
        <div className="bg-blue-50 p-6 rounded-lg  flex items-center space-x-4">
          <div className="bg-blue-600 p-4 rounded-xl text-white">
            <FaMoneyBillWave size={50} />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total Amount</p>
            <p className="text-xl font-bold text-blue-800">₹2000</p>
          </div>
        </div>

        {/* Collected Amount Card */}
        <div className="bg-green-50 p-6 rounded-lg  flex items-center space-x-4">
          <div className="bg-green-600 p-4 rounded-xl text-white">
            <FaCoins size={50} />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Collected Amount</p>
            <p className="text-xl font-bold text-green-800">₹2000</p>
          </div>
        </div>

        {/* Remaining Amount Card */}
        <div className="bg-red-50 p-6 rounded-lg  flex items-center space-x-4">
          <div className="bg-red-600 p-4 rounded-xl text-white">
            <FaHandHoldingUsd size={50} />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Remaining Amount</p>
            <p className="text-xl font-bold text-red-800">₹2000</p>
          </div>
        </div>
      </div>

      {/* Transaction History Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h2>

      <div className="bg-white p-6 rounded-lg  overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactionHistoryData.map((transaction, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.studentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.contactNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeesManagement;