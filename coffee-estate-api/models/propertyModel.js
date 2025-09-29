const db = require('../config/db');

exports.createProperty = async (property) => {
  const { property_name, address, created_on, created_by } = property;
  const [result] = await db.execute(
    `INSERT INTO property (property_name, address, created_on, created_by)
     VALUES (?, ?, ?, ?)`,
    [property_name, address, created_on, created_by]
  );
  return result;
};

exports.getAllProperties = async () => {
  const [rows] = await db.execute(`SELECT * FROM property`);
  return rows;
};

exports.getPropertyByUserId = async (id) => {
  const [rows] = await db.execute(
    ` SELECT p.property_id, p.property_name, p.total_acre, p.address_1, p.address_2, p.pincode, p.created_on, p.created_by, p.modified_on, p.modified_by
    FROM Property p
    JOIN Propertyuser pu ON p.property_id = pu.property_id
    WHERE pu.user_id = ?`,
    [id]
  );
  return rows;
};

exports.updateProperty = async (id, data) => {
  const { property_name, address, modified_on, modified_by } = data;
  const [result] = await db.execute(
    `UPDATE property
     SET property_name = ?, address = ?, modified_on = ?, modified_by = ?
     WHERE property_id = ?`,
    [property_name, address, modified_on, modified_by, id]
  );
  return result;
};

exports.deleteProperty = async (id) => {
  const [result] = await db.execute(
    `DELETE FROM property WHERE property_id = ?`,
    [id]
  );
  return result;
};
