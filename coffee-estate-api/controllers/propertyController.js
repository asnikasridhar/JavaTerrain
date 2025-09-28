const Property = require('../models/propertyModel');

exports.createProperty = async (req, res) => {
  try {
    const property = req.body;
    const result = await Property.createProperty(property);
    res.status(201).json({ message: 'Property created successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.getAllProperties();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await Property.getPropertyById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Property.updateProperty(id, data);
    res.status(200).json({ message: 'Property updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;
    await Property.deleteProperty(id);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error });
  }
};
