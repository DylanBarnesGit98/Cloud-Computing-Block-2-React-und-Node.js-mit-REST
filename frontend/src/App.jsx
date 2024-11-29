import React, { useState, useEffect } from "react";
import axios from "axios";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  // Daten abrufen
  useEffect(() => {
    axios.get("http://localhost:2000/expenses")
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Neue Ausgabe hinzufügen
  const addExpense = (newExpense) => {
    axios.post("http://localhost:2000/expenses", newExpense)
      .then((response) => setExpenses([...expenses, response.data]))
      .catch((error) => console.error(error));
  };

  // Ausgabe löschen
  const deleteExpense = (id) => {
    axios.delete(`http://localhost:2000/expenses/${id}`)
      .then(() => setExpenses(expenses.filter((expense) => expense.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">PennyPlan</h1>
      <AddExpenseForm onAddExpense={addExpense} />
      <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
    </div>
  );
};

export default App;
