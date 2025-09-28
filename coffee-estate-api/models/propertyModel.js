const db = require('../config/db');

exports.createProperty = async (property) => {
  const { property_name, address, created_on, created_by } = property;
  const [result] = await db.execute(
    `INSERT INTO property (property_name, address, created_on, created_by)
     VALUES (?, ?, ?, ?)`,
    [property_name, address, created_on, created_by]
  );
  return result;
};

exports.getAllProperties = async () => {
  const [rows] = await db.execute(`SELECT * FROM property`);
  return rows;
};

exports.getPropertyById = async (id) => {
  const [rows] = await db.execute(
    `SELECT * FROM property WHERE property_id = ?`,
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

exports.updateProperty = async (id, data) => {
  const { property_name, address, modified_on, modified_by } = data;
  const [result] = await db.execute(
    `UPDATE property
     SET property_name = ?, address = ?, modified_on = ?, modified_by = ?
     WHERE property_id = ?`,
    [property_name, address, modified_on, modified_by, id]
  );
  return result;
};

exports.deleteProperty = async (id) => {
  const [result] = await db.execute(
    `DELETE FROM property WHERE property_id = ?`,
    [id]
  );
  return result;
};
