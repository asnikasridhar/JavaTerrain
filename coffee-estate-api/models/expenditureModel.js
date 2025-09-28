const db = require('../config/db');

exports.createExpenditure = async (exp) => {
  const { item, amount, block_id, created_on, created_by } = exp;
  const [result] = await db.execute(
    `INSERT INTO Expenditure (item, amount, block_id, created_on, created_by)
     VALUES (?, ?, ?, ?, ?)`,
    [item, amount, block_id, created_on, created_by]
  );
  return result;
};

exports.getAllExpenditures = async () => {
  const [rows] = await db.execute(
    `SELECT exp_id, item, amount, block_id, created_on, created_by, modified_on, modified_by 
     FROM Expenditure`
  );
  return rows;
};

exports.getExpenditureById = async (id) => {
  const [rows] = await db.execute(
    `SELECT exp_id, item, amount, block_id, created_on, created_by, modified_on, modified_by 
     FROM Expenditure WHERE exp_id = ?`,
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

exports.updateExpenditure = async (id, data) => {
  const { item, amount, block_id, modified_on, modified_by } = data;
  const [result] = await db.execute(
    `UPDATE Expenditure
     SET item = ?, amount = ?, block_id = ?, modified_on = ?, modified_by = ?
     WHERE exp_id = ?`,
    [item, amount, block_id, modified_on, modified_by, id]
  );
  return result;
};

exports.deleteExpenditure = async (id) => {
  const [result] = await db.execute(`DELETE FROM Expenditure WHERE exp_id = ?`, [id]);
  return result;
};
