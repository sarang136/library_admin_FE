// src/components/TransactionHistoryPage.jsx

import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Importing the back arrow icon

// Dummy data for the table
const transactionData = [
  {
    studentId: 'stud213',
    name: 'John Doe',
    contactNo: '8585858585',
    date: '20/08/2025',
    paymentMethod: 'UPI',
    amount: '₹2000',
  },
  // Add more dummy data as needed
  {
    studentId: 'stud214',
    name: 'Jane Smith',
    contactNo: '9876543210',
    date: '19/08/2025',
    paymentMethod: 'Card',
    amount: '₹1500',
  },
];

const TransactionHistory = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Back Arrow */}
      <div className="flex items-center space-x-4 mb-6 text-gray-800">
        
        <h1 className="text-2xl font-semibold">Transaction History</h1>
      </div>

      {/* Transaction Table */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
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
            {transactionData.map((transaction, index) => (
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

export default TransactionHistory;