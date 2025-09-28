const db = require('../config/db');

exports.createPlant = async (plant) => {
  const { plant_name, species, created_on, created_by } = plant;
  const [result] = await db.execute(
    `INSERT INTO Plants (plant_name, species, created_on, created_by)
     VALUES (?, ?, ?, ?)`,
    [plant_name, species, created_on, created_by]
  );
  return result;
};

exports.getAllPlants = async () => {
  const [rows] = await db.execute(
    `SELECT plant_id, plant_name, species, created_on, created_by, modified_on, modified_by 
     FROM Plants`
  );
  return rows;
};

exports.getPlantById = async (id) => {
  const [rows] = await db.execute(
    `SELECT plant_id, plant_name, species, created_on, created_by, modified_on, modified_by 
     FROM Plants WHERE plant_id = ?`,
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

exports.updatePlant = async (id, data) => {
  const { plant_name, species, modified_on, modified_by } = data;
  const [result] = await db.execute(
    `UPDATE Plants
     SET plant_name = ?, species = ?, modified_on = ?, modified_by = ?
     WHERE plant_id = ?`,
    [plant_name, species, modified_on, modified_by, id]
  );
  return result;
};

exports.deletePlant = async (id) => {
  const [result] = await db.execute(`DELETE FROM Plants WHERE plant_id = ?`, [id]);
  return result;
};
