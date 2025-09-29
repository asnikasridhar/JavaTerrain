const db = require('../config/db');

// Create Expenditure
exports.createExpenditure = async (exp) => {
  const { water, fertilizer, pruning, others, edate, property_id, created_by, fuel } = exp;
  const created_on = new Date();

  const [result] = await db.execute(
    `INSERT INTO Expenditure (water, fertilizer, pruning, others, edate, property_id, created_on, created_by, fuel) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [water, fertilizer, pruning, others, edate, property_id, created_on, 'sys', 0]
  );
  return result;
};

// Get all Expenditures
exports.getAllExpenditures = async () => {
  const [rows] = await db.execute(`SELECT * FROM Expenditure`);
  return rows;
};

// Get Expenditure by ID
exports.getExpenditureById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM Expenditure WHERE expenditure_id = ?`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

// Get Expenditures by property_id within last N days
exports.getExpendituresByPropertyId = async (propertyId, days) => {
  const [rows] = await db.execute(
    `SELECT * FROM Expenditure 
     WHERE property_id = ? 
     AND edate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)`,
    [propertyId, days]
  );
  return rows;
};

// Update Expenditure
exports.updateExpenditure = async (id, data) => {
  const { water, fertilizer, pruning, others, edate, property_id, modified_by, fuel } = data;
  const modified_on = new Date();

  const [result] = await db.execute(
    `UPDATE Expenditure 
     SET water = ?, fertilizer = ?, pruning = ?, others = ?, edate = ?, property_id = ?, modified_on = ?, modified_by = ?, fuel = ?
     WHERE expenditure_id = ?`,
    [water, fertilizer, pruning, others, edate, property_id, modified_on, modified_by, fuel, id]
  );
  return result;
};

// Delete Expenditure
exports.deleteExpenditure = async (id) => {
  const [result] = await db.execute(`DELETE FROM Expenditure WHERE expenditure_id = ?`, [id]);
  return result;
};
