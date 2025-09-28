const db = require('../config/db');

exports.createBlock = async (block) => {
  const { block_name, property_id, created_on, created_by } = block;
  const [result] = await db.execute(
    `INSERT INTO block (block_name, property_id, created_on, created_by)
     VALUES (?, ?, ?, ?)`,
    [block_name, property_id, created_on, created_by]
  );
  return result;
};

exports.getAllBlocks = async () => {
  const [rows] = await db.execute(
    `SELECT b.*, p.property_name 
     FROM block b
     INNER JOIN property p ON b.property_id = p.property_id`
  );
  return rows;
};

exports.getBlockById = async (id) => {
  const [rows] = await db.execute(
    `SELECT b.*, p.property_name 
     FROM block b
     INNER JOIN property p ON b.property_id = p.property_id
     WHERE b.block_id = ?`,
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

exports.getBlocksByPropertyId = async (propertyId) => {
  const [rows] = await db.execute(
    `SELECT * FROM block WHERE property_id = ?`,
    [propertyId]
  );
  return rows;
};

exports.updateBlock = async (id, data) => {
  const { block_name, property_id, modified_on, modified_by } = data;
  const [result] = await db.execute(
    `UPDATE block
     SET block_name = ?, property_id = ?, modified_on = ?, modified_by = ?
     WHERE block_id = ?`,
    [block_name, property_id, modified_on, modified_by, id]
  );
  return result;
};

exports.deleteBlock = async (id) => {
  const [result] = await db.execute(
    `DELETE FROM block WHERE block_id = ?`,
    [id]
  );
  return result;
};
