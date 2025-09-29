const db = require('../config/db');

// Create Crop Detail
exports.createCropDetail = async (crop) => {
  const { yield_obtained, selling_price, property_id, created_by, other_detail } = crop;
  const created_on = new Date();
console.log(yield_obtained, selling_price, property_id, created_by, other_detail);
  const [result] = await db.execute(
    `INSERT INTO CropDetails (yield_obtained, selling_price, property_id, created_on, created_by, other_detail) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [yield_obtained, selling_price, property_id, created_on, 'sys', ""]
  );
  return result;
};

// Get All Crop Details
exports.getAllCropDetails = async () => {
  const [rows] = await db.execute(`SELECT * FROM CropDetails`);
  return rows;
};

// Get Crop Detail by crop_id
exports.getCropDetailById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM CropDetails WHERE crop_id = ?`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

// Get Crop Details by property_id
exports.getCropDetailsByPropertyId = async (propertyId) => {
  const [rows] = await db.execute(
    `SELECT c.*, p.property_name  
     FROM CropDetails c 
     INNER JOIN Property p ON c.property_id = p.property_id 
     WHERE c.property_id = ?`,
    [propertyId]
  );
  return rows;
};

// Update Crop Detail
exports.updateCropDetail = async (id, data) => {
  const { yield_obtained, selling_price, property_id, modified_by, other_detail } = data;
  const modified_on = new Date();

  const [result] = await db.execute(
    `UPDATE CropDetails 
     SET yield_obtained = ?, selling_price = ?, property_id = ?, modified_on = ?, modified_by = ?, other_detail = ?
     WHERE crop_id = ?`,
    [yield_obtained, selling_price, property_id, modified_on, modified_by, other_detail, id]
  );
  return result;
};

// Delete Crop Detail
exports.deleteCropDetail = async (id) => {
  const [result] = await db.execute(`DELETE FROM CropDetails WHERE crop_id = ?`, [id]);
  return result;
};
