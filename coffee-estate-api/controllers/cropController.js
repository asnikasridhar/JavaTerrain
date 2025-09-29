const CropModel = require('../models/cropModel');

exports.addCrop = async (req, res) => {
  try {
    const created_on = new Date();
    await CropModel.createCrop({ ...req.body, created_on });
    res.send('Crop added successfully.');
  } catch (err) {
    res.status(500).send('Error adding crop.');
  }
};

exports.getAllCrops = async (req, res) => {
  try {
    const crops = await CropModel.getAllCrops();
    res.json(crops);
  } catch (err) {
    res.status(500).send('Error fetching crops.');
  }
};

exports.getCropById = async (req, res) => {
  try {
    const crop = await CropModel.getCropById(req.params.id);
    if (!crop) return res.status(404).send('Crop not found.');
    res.json(crop);
  } catch (err) {
    res.status(500).send('Error fetching crop.');
  }
};

exports.getByPropertyId = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const crops = await CropModel.getByPropertyId(propertyId);
    res.json(crops);
  } catch (err) {
    console.error('Error fetching crop details:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateCrop = async (req, res) => {
  try {
    const modified_on = new Date();
    const result = await CropModel.updateCrop(req.params.id, { ...req.body, modified_on });
    if (result.affectedRows === 0) return res.status(404).send('Crop not found.');
    res.send('Crop updated successfully.');
  } catch (err) {
    res.status(500).send('Error updating crop.');
  }
};

exports.deleteCrop = async (req, res) => {
  try {
    const result = await CropModel.deleteCrop(req.params.id);
    if (result.affectedRows === 0) return res.status(404).send('Crop not found.');
    res.send('Crop deleted successfully.');
  } catch (err) {
    res.status(500).send('Error deleting crop.');
  }
};
