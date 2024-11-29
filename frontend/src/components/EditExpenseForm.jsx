import React, { useState } from 'react';

const EditExpenseForm = ({ expense, onUpdateExpense }) => {
  const [editedExpense, setEditedExpense] = useState(expense);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateExpense(editedExpense);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <label>
        Category:
        <input
          type="text"
          value={editedExpense.category}
          onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
          required
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={editedExpense.amount}
          onChange={(e) => setEditedExpense({ ...editedExpense, amount: e.target.value })}
          required
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={editedExpense.description}
          onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
        />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditExpenseForm;
