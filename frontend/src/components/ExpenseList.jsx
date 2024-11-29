import React from 'react';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index} className="p-2 border-b">
            <span>{expense.category} - ${expense.amount}</span>
            <span>: {expense.description}</span>
            <button onClick={() => onEdit(index)}>Edit</button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
