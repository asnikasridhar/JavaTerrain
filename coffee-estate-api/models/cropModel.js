const db = require('../config/db');

exports.createCrop = async (crop) => {
  const { crop_name, season, created_on, created_by } = crop;
  const [result] = await db.execute(
    `INSERT INTO Crops (crop_name, season, created_on, created_by)
     VALUES (?, ?, ?, ?)`,
    [crop_name, season, created_on, created_by]
  );
  return result;
};

exports.getAllCrops = async () => {
  const [rows] = await db.execute(
    `SELECT crop_id, crop_name, season, created_on, created_by, modified_on, modified_by 
     FROM Crops`
  );
  return rows;
};

exports.getCropById = async (id) => {
  const [rows] = await db.execute(
    `SELECT crop_id, crop_name, season, created_on, created_by, modified_on, modified_by 
     FROM Crops WHERE crop_id = ?`,
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

exports.getByPropertyId = async (propertyId) => {
  const [rows] = await db.execute(`
    SELECT 
      cd.crop_id,
      cd.property_id,
      p.property_name,
      cd.yield_obtained,
      cd.selling_price,
      ci.income_amount AS income
    FROM cropdetails cd
    LEFT JOIN crop_income ci ON cd.crop_id = ci.crop_id
    INNER JOIN property p ON p.property_id = cd.property_id
    WHERE cd.property_id = ?
  `, [propertyId]);

  return rows;
};


exports.updateCrop = async (id, data) => {
  const { crop_name, season, modified_on, modified_by } = data;
  const [result] = await db.execute(
    `UPDATE Crops
     SET crop_name = ?, season = ?, modified_on = ?, modified_by = ?
     WHERE crop_id = ?`,
    [crop_name, season, modified_on, modified_by, id]
  );
  return result;
};

exports.deleteCrop = async (id) => {
  const [result] = await db.execute(`DELETE FROM Crops WHERE crop_id = ?`, [id]);
  return result;
};


