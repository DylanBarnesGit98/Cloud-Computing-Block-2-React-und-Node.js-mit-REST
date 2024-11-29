const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 2000;

// File path for data.json
const dataPath = path.join(__dirname, "data.json");

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read data from file
const readExpenses = () => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading data.json:", err);
    return [];
  }
};

// Helper function to write data to file
const writeExpenses = (expenses) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(expenses, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to data.json:", err);
  }
};

// GET endpoint to fetch all expenses
app.get("/data", (req, res) => {
  const expenses = readExpenses();
  res.json(expenses);
});

// POST endpoint to add an expense
app.post("/data", (req, res) => {
  const newExpense = {
    id: uuidv4(),
    ...req.body,
  };

  const expenses = readExpenses();
  expenses.push(newExpense);
  writeExpenses(expenses);
  res.status(201).json(newExpense);
});

// PUT endpoint to update an existing expense
app.put("/data/:id", (req, res) => {
  const { id } = req.params;
  const updatedExpense = req.body;
  const expenses = readExpenses();

  const expenseIndex = expenses.findIndex((expense) => expense.id === id);
  if (expenseIndex !== -1) {
    expenses[expenseIndex] = { ...expenses[expenseIndex], ...updatedExpense };
    writeExpenses(expenses);
    res.json(expenses[expenseIndex]);
  } else {
    res.status(404).json({ error: "Expense not found" });
  }
});

// DELETE endpoint to remove an expense
app.delete("/data/:id", (req, res) => {
  const { id } = req.params;
  let expenses = readExpenses();

  // Remove the expense with the given id
  expenses = expenses.filter((expense) => expense.id !== id);

  // Write the updated expenses back to the file
  writeExpenses(expenses);

  res.status(200).json({ message: `Expense with id ${id} deleted successfully` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
