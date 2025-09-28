const db = require('../config/db');

exports.createFertilizer = async (fertilizer) => {
  const { fertilizer_name, date_of_application, property_id, created_by, other_details, created_on } = fertilizer;
  const [result] = await db.execute(
    `INSERT INTO Fertilizers (fertilizer_name, date_of_application, property_id, created_on, created_by, other_details) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [fertilizer_name, date_of_application, property_id, created_on, created_by, other_details]
  );
  return result;
};

exports.getAllFertilizers = async () => {
  const [rows] = await db.execute(
    `SELECT fertilizer_id, fertilizer_name, date_of_application, property_id, created_on, created_by, modified_on, modified_by, other_details 
     FROM Fertilizers`
  );
  return rows;
};

exports.getFertilizerById = async (id) => {
  const [rows] = await db.execute(
    `SELECT fertilizer_id, fertilizer_name, date_of_application, property_id, created_on, created_by, modified_on, modified_by, other_details 
     FROM Fertilizers WHERE fertilizer_id = ?`,
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

exports.getFertilizersByPropertyAndDays = async (propertyId, days) => {
  const [rows] = await db.execute(
    `SELECT fertilizer_id, fertilizer_name, date_of_application, property_id, created_on, created_by, modified_on, modified_by, other_details 
     FROM Fertilizers
     WHERE property_id = ?
     AND date_of_application >= DATE_SUB(CURDATE(), INTERVAL ? DAY)`,
    [propertyId, days]
  );
  return rows;
};

exports.updateFertilizer = async (id, data) => {
  const { fertilizer_name, date_of_application, property_id, modified_on, modified_by, other_details } = data;
  const [result] = await db.execute(
    `UPDATE Fertilizers 
     SET fertilizer_name = ?, date_of_application = ?, property_id = ?, modified_on = ?, modified_by = ?, other_details = ?
     WHERE fertilizer_id = ?`,
    [fertilizer_name, date_of_application, property_id, modified_on, modified_by, other_details, id]
  );
  return result;
};

exports.deleteFertilizer = async (id) => {
  const [result] = await db.execute(`DELETE FROM Fertilizers WHERE fertilizer_id = ?`, [id]);
  return result;
};
