const db = require('../config/db');

exports.createAcre = async (acre) => {
  const { user_id, acre_size, plant_type, terrain, location, water_availability, property_id, created_on, created_by } = acre;
  const [result] = await db.execute(
    `INSERT INTO Acres (user_id, acre_size, plant_type, terrain, location, water_availability, property_id, created_on, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_id, acre_size, plant_type, terrain, location, water_availability, property_id, created_on, created_by]
  );
  return result;
};

exports.getAllAcres = async () => {
  const [rows] = await db.execute(`SELECT * FROM Acres`);
  return rows;
};

exports.getAcreById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM Acres WHERE acre_id = ?`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

exports.getAcresByUserId = async (userId) => {
  const [rows] = await db.execute(`SELECT * FROM Acres WHERE user_id = ?`, [userId]);
  return rows;
};

exports.updateAcre = async (id, data) => {
  const { user_id, acre_size, plant_type, terrain, location, water_availability, property_id, modified_on, modified_by } = data;
  const [result] = await db.execute(
    `UPDATE Acres
     SET user_id = ?, acre_size = ?, plant_type = ?, terrain = ?, location = ?, 
         water_availability = ?, property_id = ?, modified_on = ?, modified_by = ?
     WHERE acre_id = ?`,
    [user_id, acre_size, plant_type, terrain, location, water_availability, property_id, modified_on, modified_by, id]
  );
  return result;
};

exports.deleteAcre = async (id) => {
  const [result] = await db.execute(`DELETE FROM Acres WHERE acre_id = ?`, [id]);
  return result;
};
