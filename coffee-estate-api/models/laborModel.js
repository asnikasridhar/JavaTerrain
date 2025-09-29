const db = require('../config/db');

exports.createLabor = async (labor) => {
  const { user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, created_on, created_by } = labor;
  console.log( user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, created_on, created_by )
  
  const [result] = await db.execute(
    `INSERT INTO Labors (user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, created_on, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, created_on, 'sys']
  );
  return result;
};

exports.linkLaborToProperty = async (property_id, labor_id) => {
  const [result] = await db.execute(
    `INSERT INTO propertylabor (property_id, labor_id) VALUES (?, ?)`,
    [property_id, labor_id]
  );
  return result;
};

exports.getAllLabors = async () => {
  const [rows] = await db.execute(`SELECT * FROM Labors`);
  return rows;
};

exports.getLaborById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM Labors WHERE labor_id = ?`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

exports.getLaborsByPropertyId = async (propertyId) => {
  const [rows] = await db.execute(
    `SELECT l.* FROM Labors l
     INNER JOIN propertylabor pl ON l.labor_id = pl.labor_id
     WHERE pl.property_id = ?`,
    [propertyId]
  );
  return rows;
};

exports.updateLabor = async (id, data) => {
  const { name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, modified_on, modified_by } = data;
  const [result] = await db.execute(
    `UPDATE Labors
     SET name = ?, age = ?, adhar_card = ?, bank_details = ?, health_history = ?, 
         photo = ?, address = ?, emergency_details = ?, modified_on = ?, modified_by = ?
     WHERE labor_id = ?`,
    [name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, modified_on, modified_by, id]
  );
  return result;
};

exports.deleteLabor = async (id) => {
  const [result] = await db.execute(`DELETE FROM Labors WHERE labor_id = ?`, [id]);
  return result;
};
