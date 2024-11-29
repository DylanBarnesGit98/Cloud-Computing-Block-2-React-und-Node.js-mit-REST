import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    id: '', // Add id to manage edit functionality
    title: '',
    description: '',
    amount: '',
    category: '',
    date: '',
    type: 'expense', // Default type is 'expense'
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
  const closeModal = () => {
    setIsModalOpen(false);
    setNewExpense({
      id: '', // Reset id for new expenses
      title: '',
      description: '',
      amount: '',
      category: '',
      date: '',
      type: 'expense', // Default to expense type
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle the 'type' between 'expense' and 'income'
  const handleToggleChange = () => {
    setNewExpense((prev) => ({
      ...prev,
      type: prev.type === 'expense' ? 'income' : 'expense',
    }));
  };

  // Handle form submission (both for adding and editing expenses)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newExpense.id) {
      // Editing an existing expense
      fetch(`http://localhost:2000/data/${newExpense.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
      })
        .then((response) => response.json())
        .then((updatedExpense) => {
          setExpenses((prev) =>
            prev.map((expense) =>
              expense.id === updatedExpense.id ? updatedExpense : expense
            )
          );
          closeModal(); // Close modal after updating
        })
        .catch((error) => console.error('Error updating expense:', error));
    } else {
      // Adding a new expense
      fetch('http://localhost:2000/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
      })
        .then((response) => response.json())
        .then((addedExpense) => {
          setExpenses((prev) => [...prev, addedExpense]);
          closeModal(); // Close modal after adding
        })
        .catch((error) => console.error('Error adding expense:', error));
    }
  };

  // Format amount with thousands separator, decimal points, and '-' for expenses
  const formatAmount = (amount, type) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));

    return type === 'expense' ? `- $${formattedAmount}` : `$${formattedAmount}`;
  };

  // Calculate total balance
  const totalBalance = expenses.reduce((total, expense) => {
    if (expense.type === 'expense') {
      return total - parseFloat(expense.amount || 0); // Subtract expenses
    } else {
      return total + parseFloat(expense.amount || 0); // Add income
    }
  }, 0);

  // Format total balance
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(totalBalance);

  // Handle delete action
  const handleDelete = (id) => {
    fetch(`http://localhost:2000/data/${id}`, { method: 'DELETE' })
      .then(() => {
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      })
      .catch((error) => console.error('Error deleting expense:', error));
  };

  // Handle edit action
  const handleEdit = (expense) => {
    setNewExpense(expense);
    openModal();
  };

  return (
    <><div>
          {/* Navbar Component */}
          <Navbar />

          <div className="p-6 bg-gray-100 min-h-screen">
              <h1 className="text-2xl font-bold mb-4">Expense Manager</h1>

              {/* Total Balance */}
              <div
                  className={`mb-4 p-4 shadow rounded-lg ${totalBalance >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                  <h2 className="text-xl font-bold">Total Balance: {formattedBalance}</h2>
              </div>

              {/* Button to open modal */}
              <button className="btn btn-primary mb-4" onClick={openModal}>
                  Add an Expense or Income
              </button>

              {/* Modal */}
              {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                          <h3 className="font-bold text-lg mb-4">
                              {newExpense.id ? 'Edit Expense' : 'Add a New Expense'}
                          </h3>
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
                                      required />
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
                                      required />
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
                                      required />
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
                                      required />
                              </div>

                              {/* Toggle for expense/income */}
                              <div className="form-control mb-4">
                                  <label className="label">
                                      <span className="label-text">Type</span>
                                  </label>
                                  <div className="flex items-center">
                                      <label className="label-text mr-2">Expense</label>
                                      <input
                                          type="checkbox"
                                          checked={newExpense.type === 'income'}
                                          onChange={handleToggleChange}
                                          className="toggle" />
                                      <label className="label-text ml-2">Income</label>
                                  </div>
                              </div>

                              <div className="modal-action">
                                  <button type="button" className="btn" onClick={closeModal}>
                                      Cancel
                                  </button>
                                  <button type="submit" className="btn btn-primary">
                                      {newExpense.id ? 'Update Expense' : 'Add Expense'}
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div>
              )}

              {/* Expense List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {expenses.map((expense) => (
                      <div key={expense.id} className="p-4 bg-white shadow rounded-lg">
                          <h3 className="font-bold text-lg">{expense.title}</h3>
                          <p className="text-sm text-gray-600">{expense.description}</p>
                          <p className="text-sm text-gray-500">Category: {expense.category}</p>
                          <p className="text-sm text-gray-400">Date: {expense.date}</p>
                          <p
                              className={`text-xl font-bold ${expense.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}
                          >
                              {formatAmount(expense.amount, expense.type)}
                          </p>

                          {/* Edit and Delete Buttons */}
                          <div className="mt-2 flex space-x-2">
                              <button
                                  className="btn btn-sm btn-outline btn-primary"
                                  onClick={() => handleEdit(expense)}
                              >
                                  Edit
                              </button>
                              <button
                                  className="btn btn-sm btn-outline btn-danger"
                                  onClick={() => handleDelete(expense.id)}
                              >
                                  Delete
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div><Footer /></>
  );
};

export default ExpenseManager;
