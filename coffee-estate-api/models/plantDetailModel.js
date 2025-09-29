const db = require('../config/db');

// Create plant detail
exports.createPlantDetail = async (data) => {
  const { plant_type, details, block_id, created_on, created_by } = data;
  const [result] = await db.execute(
    `INSERT INTO plantdetails (plant_type, details, block_id, created_on, created_by)
     VALUES (?, ?, ?, ?, ?)`,
    [plant_type, details, block_id, created_on, 'sys']
  );
  return result;
};

// Get all plant details
exports.getAllPlantDetails = async () => {
  const [rows] = await db.execute(`SELECT * FROM plantdetails`);
  return rows;
};

// Get plant detail by ID
exports.getPlantDetailById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM plantdetails WHERE plant_id = ?`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

// Get plant details by property_id
exports.getPlantDetailsByProperty = async (property_id) => {
  const [rows] = await db.execute(
    `SELECT p.plant_id, p.plant_type, p.details, b.block_name, p.block_id
     FROM plantdetails p
     INNER JOIN blocks b ON p.block_id = b.block_id
     INNER JOIN property pp ON pp.property_id = b.property_id
     WHERE b.property_id = ?`,
    [property_id]
  );
  return rows;
};

// Update plant detail
exports.updatePlantDetail = async (id, data) => {
  const { block_id, plant_type, details, modified_on, modified_by } = data;
  const [result] = await db.execute(
    `UPDATE plantdetails
     SET block_id = ?, plant_type = ?, details = ?, modified_on = ?, modified_by = ?
     WHERE plant_id = ?`,
    [block_id, plant_type, details, modified_on, modified_by, id]
  );
  return result;
};

// Delete plant detail
exports.deletePlantDetail = async (id) => {
  const [result] = await db.execute(`DELETE FROM plantdetails WHERE plant_id = ?`, [id]);
  return result;
};
