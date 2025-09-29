const Property = require('../models/propertyModel');

// Create Property for a user (with transaction)
exports.addPropertyForUser = async (req, res) => {
  try {
    const created_on = new Date();
    const modified_on = new Date();
    const property = { ...req.body, created_on, modified_on };
    const result = await Property.createPropertyForUser(property);
    res.status(201).json({ message: 'Property added successfully', property_id: result.property_id });
  } catch (err) {
    console.error('Error adding property for user:', err);
    res.status(500).json({ error: 'Failed to add property' });
  }
};

// Create Property (simple)
exports.addProperty = async (req, res) => {
  try {
    const created_on = new Date();
    const property = { ...req.body, created_on };
    await Property.createProperty(property);
    res.status(201).send('Property added successfully.');
  } catch (err) {
    console.error('Error adding property:', err);
    res.status(500).send('Error adding property.');
  }
};

// Get Property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.getPropertyById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    console.error('Error fetching property:', err);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
};

// Get All Properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.getAllProperties();
    res.json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).send('Error retrieving properties.');
  }
};

// Get Properties by User
exports.getPropertiesByUser = async (req, res) => {
  try {
    const properties = await Property.getPropertiesByUser(req.params.user_id);
    res.json(properties);
  } catch (err) {
    console.error('Error fetching user properties:', err);
    res.status(500).json({ error: 'Failed to retrieve properties' });
  }
};

// Update Property
exports.updateProperty = async (req, res) => {
  try {
    const modified_on = new Date();
    const property = { ...req.body, modified_on };
    const result = await Property.updateProperty(req.params.property_id, property);
    if (result.affectedRows === 0) return res.status(404).send('Property not found.');
    res.send('Property updated successfully.');
  } catch (err) {
    console.error('Error updating property:', err);
    res.status(500).send('Error updating property.');
  }
};

// Delete Property
exports.deleteProperty = async (req, res) => {
  try {
    const result = await Property.deleteProperty(req.params.property_id);
    if (result.affectedRows === 0) return res.status(404).send('Property not found.');
    res.send('Property deleted successfully.');
  } catch (err) {
    console.error('Error deleting property:', err);
    res.status(500).send('Error deleting property.');
  }
};
