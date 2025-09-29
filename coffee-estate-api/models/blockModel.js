const db = require('../config/db');

// Create a Block
exports.createBlock = async (block) => {
  const { block_name, block_area, property_id } = block;
  const [result] = await db.execute(
    `INSERT INTO blocks (block_name, block_area, property_id) VALUES (?, ?, ?)`,
    [block_name, block_area, property_id]
  );
  return result;
};

// Get Block by ID
exports.getBlockById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM blocks WHERE block_id = ?`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

// Get Blocks by property_id
exports.getBlocksByPropertyId = async (propertyId) => {
  const [rows] = await db.execute(
    `SELECT b.*, p.property_name 
     FROM blocks b 
     INNER JOIN property p ON b.property_id = p.property_id 
     WHERE b.property_id = ?`,
    [propertyId]
  );
  return rows;
};

// Update Block
exports.updateBlock = async (id, data) => {
  const { block_name, block_area, property_id } = data;
  const [result] = await db.execute(
    `UPDATE blocks SET block_name = ?, block_area = ?, property_id = ? WHERE block_id = ?`,
    [block_name, block_area, property_id, id]
  );
  return result;
};

// Delete Block
exports.deleteBlock = async (id) => {
  const [result] = await db.execute(`DELETE FROM blocks WHERE block_id = ?`, [id]);
  return result;
};
