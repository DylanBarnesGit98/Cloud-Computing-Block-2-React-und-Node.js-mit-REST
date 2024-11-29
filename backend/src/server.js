const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());

// Daten (kann durch Datei ersetzt werden)
let expenses = [];

// GET: Alle Einträge abrufen
app.get("/expenses", (req, res) => {
  res.json(expenses);
});

// POST: Neuen Eintrag hinzufügen
app.post("/expenses", (req, res) => {
  const newExpense = { id: Date.now(), ...req.body };
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// PUT: Eintrag bearbeiten
app.put("/expenses/:id", (req, res) => {
  const { id } = req.params;
  const index = expenses.findIndex((e) => e.id == id);
  if (index !== -1) {
    expenses[index] = { ...expenses[index], ...req.body };
    res.json(expenses[index]);
  } else {
    res.status(404).json({ message: "Expense not found" });
  }
});

// DELETE: Eintrag löschen
app.delete("/expenses/:id", (req, res) => {
  const { id } = req.params;
  expenses = expenses.filter((e) => e.id != id);
  res.status(204).end();
});

// Server starten
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
