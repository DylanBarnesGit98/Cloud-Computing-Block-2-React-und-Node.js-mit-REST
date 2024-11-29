const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());

// Sample data to simulate storage
let expenses = [];

// GET endpoint to fetch all expenses
app.get("/data", (req, res) => {
  res.json(expenses);
});

// POST endpoint to add an expense
app.post("/data", (req, res) => {
  const newExpense = req.body; // Expecting { name, amount, category, date }
  expenses.push(newExpense);  // Adding to the in-memory array
  res.status(201).json(newExpense);  // Respond with the newly added expense
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
