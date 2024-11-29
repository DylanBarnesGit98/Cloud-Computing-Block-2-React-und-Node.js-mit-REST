import React, { useState, useEffect } from 'react';
import ExpenseListEntry from './ExpenseListEntry';

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: '',
    description: '',
    amount: '',
    category: '',
    date: '',
  });

  // Fetch expenses from the backend
  useEffect(() => {
    fetch('http://localhost:2000/data')
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error('Error fetching expenses:', error));
  }, []);

  // Handle modal open/close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:2000/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense),
    })
      .then((response) => response.json())
      .then((addedExpense) => {
        setExpenses((prev) => [...prev, addedExpense]);
        setNewExpense({
          title: '',
          description: '',
          amount: '',
          category: '',
          date: '',
        }); // Reset form
        closeModal(); // Close modal
      })
      .catch((error) => console.error('Error adding expense:', error));
  };

  // Calculate total balance
  const totalBalance = expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Expense Manager</h1>

      {/* Total Balance */}
      <div className="mb-4 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold">Total Balance: ${totalBalance.toFixed(2)}</h2>
      </div>

      {/* Button to open modal */}
      <button className="btn btn-primary mb-4" onClick={openModal}>
        Add an Expense or Income
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">Add a New Expense</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={newExpense.title}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  value={newExpense.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Amount</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={newExpense.category}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={newExpense.date}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Expense List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {expenses.map((expense, index) => (
          <ExpenseListEntry key={index} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default ExpenseManager;
