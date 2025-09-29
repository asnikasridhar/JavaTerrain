const db = require('../config/db');

// Create Property for a user (with transaction to Propertyuser)
exports.createPropertyForUser = async (property) => {
  const { property_name, total_acre, address_1, address_2, pincode, user_id, created_on } = property;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [result1] = await connection.execute(
      `INSERT INTO property (property_name, total_acre, address_1, address_2, pincode, user_id, created_on, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [property_name, total_acre, address_1, address_2, pincode, user_id, created_on, 'sys']
    );

    const property_id = result1.insertId;

    await connection.execute(
      `INSERT INTO propertyuser (property_id, user_id) VALUES (?, ?)`,
      [property_id, user_id]
    );

    await connection.commit();
    connection.release();
    return { property_id };
  } catch (err) {
    await connection.rollback();
    connection.release();
    throw err;
  }
};


// Create Property (simple)
exports.createProperty = async (property) => {
  const { property_name, total_acre, address_1, address_2, pincode, user_id, created_on, created_by } = property;
  const [result] = await db.execute(
    `INSERT INTO property (property_name, total_acre, address_1, address_2, pincode, user_id, created_on, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [property_name, total_acre, address_1, address_2, pincode, user_id, created_on, 'sys']
  );
  return result;
};

// Get Property by ID
exports.getPropertyById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM property WHERE property_id = ?`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

// Get all Properties
exports.getAllProperties = async () => {
  const [rows] = await db.execute(`SELECT * FROM property`);
  return rows;
};

// Get Properties by user_id
exports.getPropertiesByUser = async (user_id) => {
  const [rows] = await db.execute(`
    SELECT p.property_id, p.property_name, p.total_acre, p.address_1, p.address_2, p.pincode, p.created_on, p.created_by, p.modified_on, p.modified_by
    FROM property p
    INNER JOIN Propertyuser pu ON p.property_id = pu.property_id
    WHERE pu.user_id = ?
  `, [user_id]);
  return rows;
};

// Update Property
exports.updateProperty = async (id, data) => {
  const { property_name, total_acre, address_1, address_2, pincode, user_id, modified_on, modified_by } = data;
  const [result] = await db.execute(
    `UPDATE property
     SET property_name = ?, total_acre = ?, address_1 = ?, address_2 = ?, pincode = ?, user_id = ?, modified_on = ?, modified_by = ?
     WHERE property_id = ?`,
    [property_name, total_acre, address_1, address_2, pincode, user_id, modified_on, modified_by, id]
  );
  return result;
};

// Delete Property
exports.deleteProperty = async (id) => {
  const [result] = await db.execute(`DELETE FROM property WHERE property_id = ?`, [id]);
  return result;
};
