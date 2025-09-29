const db = require('../config/db');

exports.findByEmail = async (email) => {
  const [rows] = await db.execute(
    `SELECT u.*, p.property_id, p.property_name
     FROM users u
     INNER JOIN propertyuser pu ON u.user_id = pu.user_id
     INNER JOIN property p ON p.property_id = pu.property_id
     WHERE email = ? AND is_active = 1`,
    [email]
  );
  return rows;
};

exports.createUser = async (user) => {
  const { username, password, role, is_active, email, created_on, created_by } = user;
  const [result] = await db.execute(
    `INSERT INTO users (username, password, role, is_active, email, created_on, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [username, password, role, is_active, email, created_on, 'sys']
  );
  return result;
};

exports.getAllUsers = async () => {
  const [rows] = await db.execute(`SELECT * FROM users`);
  return rows;
};

exports.getUserById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM users WHERE user_id = ?`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

exports.getUsersByPropertyId = async (propertyId) => {
  const [rows] = await db.execute(
    `SELECT u.user_id, u.username
     FROM users u
     INNER JOIN propertyuser pu ON u.user_id = pu.user_id
     WHERE pu.property_id = ?`,
    [propertyId]
  );
  return rows;
};

exports.updateUser = async (id, data) => {
  const { username, password, role, is_active, email, modified_on, modified_by } = data;
  const [result] = await db.execute(
    `UPDATE users
     SET username = ?, password = ?, role = ?, is_active = ?, email = ?, modified_on = ?, modified_by = ?
     WHERE user_id = ?`,
    [username, password, role, is_active, email, modified_on, modified_by, id]
  );
  return result;
};
