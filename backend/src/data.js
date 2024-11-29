// backend/src/data.js
let expenses = []; // Array als Speicher für Budget-Daten

module.exports = {
  getExpenses: () => expenses, // Liefert alle gespeicherten Einträge
  addExpense: (newExpense) => expenses.push(newExpense), // Fügt einen neuen Eintrag hinzu
  updateExpense: (id, updatedExpense) => {
    const index = expenses.findIndex((expense) => expense.id === id);
    if (index !== -1) {
      expenses[index] = { ...expenses[index], ...updatedExpense };
      return true;
    }
    return false;
  },
  deleteExpense: (id) => {
    const index = expenses.findIndex((expense) => expense.id === id);
    if (index !== -1) {
      expenses.splice(index, 1);
      return true;
    }
    return false;
  },
};
