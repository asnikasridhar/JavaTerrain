const UserModel = require('../models/userModel');
const { hashPassword } = require('../utils/hash');

exports.addUser = async (req, res) => {
  try {
    const { username, password, role, is_active, email, created_by } = req.body;
    const created_on = new Date();
    const hashed = await hashPassword(password);

    await UserModel.createUser({
      username,
      password: hashed,
      role,
      is_active,
      email,
      created_on,
      created_by
    });

    res.json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Add user error:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};

exports.getUsersByPropertyId = async (req, res) => {
  try {
    const users = await UserModel.getUsersByPropertyId(req.params.propertyId);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found for this property' });
    }
    res.json(users);
  } catch (error) {
    console.error('Get users by property ID error:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, password, role, is_active, email, modified_by } = req.body;
    const modified_on = new Date();
    const hashed = await hashPassword(password);

    const result = await UserModel.updateUser(req.params.id, {
      username,
      password: hashed,
      role,
      is_active,
      email,
      modified_on,
      modified_by
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};
