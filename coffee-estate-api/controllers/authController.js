const UserModel = require('../models/userModel');
const { comparePassword } = require('../utils/hash');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRows = await UserModel.findByEmail(email);

    if (!userRows || userRows.length === 0) {
      return res.status(404).json({ message: 'User not found or inactive' });
    }

    const user = userRows[0];
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const properties = userRows.map(e => ({
      property_id: e.property_id,
      property_name: e.property_name
    }));

    res.json({
      user_id: user.user_id,
      user_name: user.username,
      role: user.role,
      property_id: user.property_id,
      property_name: user.property_name,
      all_properties: properties,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};
