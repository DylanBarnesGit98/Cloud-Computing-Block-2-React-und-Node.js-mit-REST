import React from 'react';

const ExpenseListEntry = ({ expense }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-gray-800">{expense.title}</h2>
        <p className="text-gray-500 text-sm">{expense.description}</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 text-sm">
          Category: <span className="font-medium text-gray-900">{expense.category}</span>
        </span>
        <span className="text-green-600 font-bold text-lg">${expense.amount}</span>
      </div>
      <div className="text-gray-400 text-xs">
        Date: <span className="text-gray-600">{expense.date}</span>
      </div>
    </div>
  );
};

export default ExpenseListEntry;
