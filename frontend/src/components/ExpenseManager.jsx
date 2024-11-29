import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    //id: '', // Add id to manage edit functionality
    title: '',
    description: '',
    amount: '',
    category: '',
    date: '',
    type: 'expense', // Default type is 'expense'
  });

  // Vordefinierte Kategorien
  const expenseCategories = ['Food', 'Transportation', 'Rent', 'Utilities', 'Entertainment'];
  const incomeCategories = ['Salary', 'Freelance', 'Investments', 'Gifts'];

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
      //id: '', // Reset id for new expenses
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

          <div className="px-40 py-10 bg-gray-100 min-h-screen">
              <h1 className="text-2xl font-bold mb-4">Expense Manager</h1>

              {/* Total Balance */}
              <div
                  className={`mb-4 p-4 shadow rounded-lg ${totalBalance >= 0 ? 'bg-green-600 text-white' : 'bg-red-500 text-'}`}
              >
                  <h2 className="text-xl font-bold">Total Balance: {formattedBalance}</h2>
              </div>

              {/* Button to open modal */}
              <button
  className="btn btn-primary text-white bg-blue-500 w-full mb-4 hover:bg-blue-500"
  onClick={openModal}
>
  Add an Expense or Income
</button>


              {/* Modal */}
              {isModalOpen && (
                              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-[75vh] overflow-auto relative">
                                {/* Cancel Button as X Icon */}
                                <button
                                  type="button"
                                  className="absolute top-4 right-4 flex items-center justify-center bg-white border-red-500 border text-red-500 rounded-full w-8 h-8 hover:bg-red-500 hover:text-white"
                                  onClick={closeModal}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                            
                                <h3 className="font-bold text-lg mb-4">
                                  {newExpense.type === "expense" ? "Add a New Expense" : "Add a New Income"}
                                </h3>
                            
                                {/* Toggle for expense/income */}
                                <div className="form-control mb-4">
                                  <label className="label">
                                    <span className="label-text"></span>
                                  </label>
                                  <div className="flex items-center">
                                    <span className="mr-2">Expense</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={newExpense.type === "income"}
                                        onChange={handleToggleChange}
                                        className="sr-only peer"
                                      />
                                      <div className="w-11 h-6 rounded-full transition duration-300 peer bg-red-500 peer-checked:bg-green-500 peer-focus:ring-4 peer-focus:ring-red-300 peer-checked:peer-focus:ring-green-300"></div>
                                      <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full shadow-md transition-all peer-checked:translate-x-5 peer-checked:left-auto"></div>
                                    </label>
                                    <span className="ml-2">Income</span>
                                  </div>
                                </div>
                            
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
                                      className="input input-bordered w-full bg-gray-200 text-gray-800"
                                      required
                                    />
                                  </div>
                            
                                  <div className="form-control mb-4">
                                    <label className="label">
                                      <span className="label-text">Description</span>
                                    </label>
                                    <input
                                      name="description"
                                      value={newExpense.description}
                                      onChange={handleInputChange}
                                      className="input input-bordered w-full bg-gray-200 text-gray-800"
                                      required
                                    />
                                  </div>
                            
                                  {/* Amount and Category in one row */}
                                  <div className="flex space-x-4 mb-4">
                                    <div className="flex-1">
                                      <label className="label">
                                        <span className="label-text">Amount</span>
                                      </label>
                                      <input
                                        type="number"
                                        name="amount"
                                        value={newExpense.amount}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full bg-gray-200 text-gray-800"
                                        required
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <label className="label">
                                        <span className="label-text">Category</span>
                                      </label>
                                      <select
                                        name="category"
                                        value={newExpense.category}
                                        onChange={handleInputChange}
                                        className="select select-bordered w-full bg-gray-200 text-gray-800"
                                        required
                                      >
                                        <option value="" disabled>
                                          Select a category
                                        </option>
                                        {(newExpense.type === 'expense' ? expenseCategories : incomeCategories).map(
                                          (category) => (
                                            <option key={category} value={category}>
                                              {category}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                  </div>
                            
                                  {/* Date and Add Income/Expense Button in one row */}
                                  <div className="flex space-x-4 mb-4">
                                    <div className="flex-1">
                                      <label className="label">
                                        <span className="label-text">Date</span>
                                      </label>
                                      <input
                                        type="date"
                                        name="date"
                                        value={newExpense.date}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full bg-gray-200 text-gray-800"
                                        required
                                      />
                                    </div>
                                    <div className="flex-1 flex items-end">
  <button
    type="submit"
    className={`btn w-full ${
      newExpense.type === 'income'
        ? 'border-green-600 text-green-600 bg-white hover:bg-green-600 hover:text-white hover:border-green-600'
        : 'border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white hover:border-red-500'
    }`}
  >
    {newExpense.id 
      ? (newExpense.type === 'income' ? 'Update Income' : 'Update Expense') 
      : (newExpense.type === 'income' ? 'Add Income' : 'Add Expense')}
  </button>
</div>

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
  className="btn btn-sm border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white bg-white hover:border-blue-500"
  onClick={() => handleEdit(expense)}
>
  Edit
</button>
                              <button
                              className="btn btn-sm bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500"
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
