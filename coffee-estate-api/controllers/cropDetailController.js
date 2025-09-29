const CropDetail = require('../models/cropDetailModel');

// Create Crop Detail
exports.addCropDetail = async (req, res) => {
  try {
    const result = await CropDetail.createCropDetail(req.body);
    res.status(201).json({ message: 'Crop detail added successfully.', result });
  } catch (err) {
    console.error('Error adding crop detail:', err);
    res.status(500).json({ error: 'Failed to add crop detail' });
  }
};

// Get All Crop Details
exports.getCropDetails = async (req, res) => {
  try {
    const results = await CropDetail.getAllCropDetails();
    res.json(results);
  } catch (err) {
    console.error('Error retrieving crop details:', err);
    res.status(500).json({ error: 'Failed to retrieve crop details' });
  }
};

// Get Crop Detail by crop_id
exports.getCropDetailById = async (req, res) => {
  try {
    const result = await CropDetail.getCropDetailById(req.params.id);
    if (!result) return res.status(404).json({ error: 'Crop not found' });
    res.json(result);
  } catch (err) {
    console.error('Error retrieving crop detail by ID:', err);
    res.status(500).json({ error: 'Failed to retrieve crop detail' });
  }
};

// Get Crop Details by property_id
exports.getCropDetailsByPropertyId = async (req, res) => {
  try {
    const results = await CropDetail.getCropDetailsByPropertyId(req.params.id);
    if (results.length === 0) return res.status(404).json({ error: 'No crops found for this property' });
    res.json(results);
  } catch (err) {
    console.error('Error retrieving crop details by property ID:', err);
    res.status(500).json({ error: 'Failed to retrieve crop details' });
  }
};

// Update Crop Detail
exports.updateCropDetail = async (req, res) => {
  try {
    await CropDetail.updateCropDetail(req.params.crop_id, req.body);
    res.json({ message: 'Crop detail updated successfully.' });
  } catch (err) {
    console.error('Error updating crop detail:', err);
    res.status(500).json({ error: 'Failed to update crop detail' });
  }
};

// Delete Crop Detail
exports.deleteCropDetail = async (req, res) => {
  try {
    await CropDetail.deleteCropDetail(req.params.crop_id);
    res.json({ message: 'Crop detail deleted successfully.' });
  } catch (err) {
    console.error('Error deleting crop detail:', err);
    res.status(500).json({ error: 'Failed to delete crop detail' });
  }
};
