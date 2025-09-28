const db = require('../config/db');

// Create Rain Detail
exports.createRainDetail = async (data) => {
  const { date_time, rain_amount, block_id, created_by } = data;
  const created_on = new Date();
  const [result] = await db.execute(
    `INSERT INTO RainDetails (date_time, rain_amount, block_id, created_on, created_by)
     VALUES (?, ?, ?, ?, ?)`,
    [date_time, rain_amount, block_id, created_on, created_by]
  );
  return result;
};

// Get all
exports.getAllRainDetails = async () => {
  const [rows] = await db.execute(`
    SELECT rain_id, date_time, rain_amount, block_id, created_on, created_by, modified_on, modified_by 
    FROM RainDetails
  `);
  return rows;
};

// Get by property_id
exports.getRainDetailsByPropertyId = async (propertyId) => {
  const [rows] = await db.execute(`
    SELECT r.rain_id, r.rain_amount, r.date_time, r.block_id, b.block_name,
           r.created_by, r.created_on, r.modified_by, r.modified_on
    FROM raindetails r
    INNER JOIN blocks b ON r.block_id = b.block_id
    INNER JOIN property p ON p.property_id = b.property_id
    WHERE p.property_id = ?
  `, [propertyId]);
  return rows;
};

// Get by ID
exports.getRainDetailById = async (id) => {
  const [rows] = await db.execute(
    `SELECT * FROM RainDetails WHERE rain_id = ?`, [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

// Update
exports.updateRainDetail = async (id, data) => {
  const { date_time, rain_amount, block_id, modified_by } = data;
  const modified_on = new Date();
  const [result] = await db.execute(`
    UPDATE RainDetails
    SET date_time = ?, rain_amount = ?, block_id = ?, modified_on = ?, modified_by = ?
    WHERE rain_id = ?
  `, [date_time, rain_amount, block_id, modified_on, modified_by, id]);
  return result;
};

// Delete
exports.deleteRainDetail = async (id) => {
  const [result] = await db.execute(
    `DELETE FROM RainDetails WHERE rain_id = ?`, [id]
  );
  return result;
};
