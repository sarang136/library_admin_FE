import React from 'react';
import { FaMoneyBillWave, FaPercentage, FaWallet, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import FinanceBarChart from './FinanceBarChart';
import { Link } from 'react-router-dom';

const recentTransactions = [
  { name: 'John Doe', amount: '₹5000' },
  { name: 'Jane Smith', amount: '₹3000' },
  { name: 'Alice Johnson', amount: '₹4500' },
  { name: 'Bob Brown', amount: '₹2000' },
];

const FinanceManagement = () => {
  return (
    <div className="p-6 bg-gray-50  space-y-6">
      
     
   {/* Overview Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 -mt-6">
  {/* Row 1 */}
  <div className="flex items-center p-5 bg-blue-100 rounded-xl shadow-sm">
    <div className="bg-blue-500 text-white p-3 rounded-none mr-4">
      <FaMoneyBillWave size={22} />
    </div>
    <div>
      <p className="text-gray-700 text-sm font-medium">Overall Revenue</p>
      <p className="text-lg font-semibold text-blue-800">₹2000</p>
    </div>
  </div>

  <div className="flex items-center p-5 bg-green-100 rounded-xl shadow-sm">
    <div className="bg-green-600 text-white p-3 rounded- mr-none mr-4">
      <FaChartLine size={22} />
    </div>
    <div>
      <p className="text-gray-700 text-sm font-medium">Gross Profit</p>
      <p className="text-lg font-semibold text-green-800">₹2000</p>
    </div>
  </div>

  <div className="flex items-center p-5 bg-red-100 rounded-xl shadow-sm">
    <div className="bg-red-600 text-white p-3 rounded-none mr-4">
      <FaArrowDown size={22} />
    </div>
    <div>
      <p className="text-gray-700 text-sm font-medium">Remaining Amount</p>
      <p className="text-lg font-semibold text-red-700">₹2000</p>
    </div>
  </div>

  {/* Row 2 */}
  <div className="flex items-center p-5 bg-blue-100 rounded-xl shadow-sm">
    <div className="bg-blue-600 text-white p-3 rounded-none mr-4">
      <FaPercentage size={22} />
    </div>
    <div>
      <p className="text-gray-700 text-sm font-medium">Net Profit</p>
      <p className="text-lg font-semibold text-blue-800">₹2000</p>
    </div>
  </div>

  <div className="flex items-center p-5 bg-green-100 rounded-xl shadow-sm">
    <div className="bg-green-600 text-white p-3 rounded-none mr-4">
      <FaWallet size={22} />
    </div>
    <div>
      <p className="text-gray-700 text-sm font-medium">Collected Amount</p>
      <p className="text-lg font-semibold text-green-800">₹2000</p>
    </div>
  </div>

  <div className="flex items-center p-5 bg-yellow-100 rounded-xl shadow-sm">
    <div className="bg-yellow-500 text-white p-3 rounded-none mr-4 ">
      <FaArrowUp size={22} />
    </div>
    <div>
      <p className="text-gray-700 text-sm font-medium">Expenses</p>
      <p className="text-lg font-semibold text-yellow-700">₹2000</p>
    </div>
  </div>
</div>


      {/* Bottom Section: Chart & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Total Revenue / Chart */}
        <div>
   
          <FinanceBarChart />
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-4 rounded-xl  flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center">
                <p className="text-gray-700">{transaction.name}</p>
                <p className="text-green-600 font-medium">{transaction.amount}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/transactionhistory">
              <button className="w-full py-2 text-black rounded-lg  transition ml-64 ">
                View All
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FinanceManagement;
