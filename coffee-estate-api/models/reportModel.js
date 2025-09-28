const db = require('../config/db');

exports.createReport = async (report) => {
  const { report_name, description, created_on, created_by } = report;
  const [result] = await db.execute(
    `INSERT INTO Reports (report_name, description, created_on, created_by)
     VALUES (?, ?, ?, ?)`,
    [report_name, description, created_on, created_by]
  );
  return result;
};

exports.getAllReports = async () => {
  const [rows] = await db.execute(
    `SELECT report_id, report_name, description, created_on, created_by, modified_on, modified_by 
     FROM Reports`
  );
  return rows;
};

exports.getReportById = async (id) => {
  const [rows] = await db.execute(
    `SELECT report_id, report_name, description, created_on, created_by, modified_on, modified_by 
     FROM Reports WHERE report_id = ?`,
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

exports.updateReport = async (id, data) => {
  const { report_name, description, modified_on, modified_by } = data;
  const [result] = await db.execute(
    `UPDATE Reports
     SET report_name = ?, description = ?, modified_on = ?, modified_by = ?
     WHERE report_id = ?`,
    [report_name, description, modified_on, modified_by, id]
  );
  return result;
};

exports.deleteReport = async (id) => {
  const [result] = await db.execute(`DELETE FROM Reports WHERE report_id = ?`, [id]);
  return result;
};
