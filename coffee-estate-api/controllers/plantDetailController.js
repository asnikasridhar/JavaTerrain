const PlantDetail = require('../models/plantDetailModel');

// Add new plant detail
exports.addPlantDetail = async (req, res) => {
  const { plant_type, details, block_id, created_by } = req.body;
  const created_on = new Date();

  try {
    const result = await PlantDetail.createPlantDetail({ plant_type, details, block_id, created_on, created_by });
    res.send('Plant detail added successfully.');
  } catch (err) {
    console.error('Error adding plant detail:', err.message);
    res.status(500).send('Error adding plant detail.');
  }
};

// Get all plant details
exports.getAllPlantDetails = async (req, res) => {
  try {
    const plantDetails = await PlantDetail.getAllPlantDetails();
    res.json(plantDetails);
  } catch (err) {
    console.error('Error retrieving plant details:', err.message);
    res.status(500).send('Error retrieving plant details.');
  }
};

// Get plant detail by ID
exports.getPlantDetailById = async (req, res) => {
  try {
    const plantDetail = await PlantDetail.getPlantDetailById(req.params.id);
    if (!plantDetail) return res.status(404).json({ error: 'Plant not found' });
    res.json(plantDetail);
  } catch (err) {
    console.error('Error retrieving plant detail by ID:', err.message);
    res.status(500).json({ error: 'Failed to retrieve plant detail' });
  }
};

// Get plant details by property_id
exports.getPlantDetailsByProperty = async (req, res) => {
  const propertyId = parseInt(req.params.property_id, 10);
  if (isNaN(propertyId)) return res.status(400).json({ error: 'Invalid property_id' });

  try {
    const plantDetails = await PlantDetail.getPlantDetailsByProperty(propertyId);
    res.json(plantDetails);
  } catch (err) {
    console.error('Error retrieving plant details by property:', err.message);
    res.status(500).json({ error: 'Failed to retrieve plant details by property' });
  }
};

// Update plant detail
exports.updatePlantDetail = async (req, res) => {
  const { block_id, plant_type, details, modified_by } = req.body;
  const modified_on = new Date();

  try {
    const result = await PlantDetail.updatePlantDetail(req.params.plant_id, { block_id, plant_type, details, modified_on, modified_by });
    if (result.affectedRows === 0) return res.status(404).send('Plant detail not found.');
    res.send('Plant detail updated successfully.');
  } catch (err) {
    console.error('Error updating plant detail:', err.message);
    res.status(500).send('Error updating plant detail.');
  }
};

// Delete plant detail
exports.deletePlantDetail = async (req, res) => {
  try {
    const result = await PlantDetail.deletePlantDetail(req.params.plant_id);
    if (result.affectedRows === 0) return res.status(404).send('Plant detail not found.');
    res.send('Plant detail deleted successfully.');
  } catch (err) {
    console.error('Error deleting plant detail:', err.message);
    res.status(500).send('Error deleting plant detail.');
  }
};
