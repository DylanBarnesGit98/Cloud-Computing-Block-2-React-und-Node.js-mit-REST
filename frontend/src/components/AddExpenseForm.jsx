import React, { useState } from 'react';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({ category: '', amount: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(expense);
    setExpense({ category: '', amount: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <label>
        Category:
        <input
          type="text"
          value={expense.category}
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
          required
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          required
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={expense.description}
          onChange={(e) => setExpense({ ...expense, description: e.target.value })}
        />
      </label>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
