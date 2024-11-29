const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

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
  const newExpense = req.body; // { title, description, amount, category, date }
  const expenses = readExpenses(); // Load existing expenses
  expenses.push(newExpense); // Add new expense
  writeExpenses(expenses); // Save updated expenses
  res.status(201).json(newExpense);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
