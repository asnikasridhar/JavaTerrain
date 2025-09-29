const PlantModel = require('../models/plantModel');

exports.addPlant = async (req, res) => {
  try {
    const created_on = new Date();
    await PlantModel.createPlant({ ...req.body, created_on });
    res.send('Plant added successfully.');
  } catch (err) {
    res.status(500).send('Error adding plant.');
  }
};

exports.getAllPlants = async (req, res) => {
  try {
    const plants = await PlantModel.getAllPlants();
    res.json(plants);
  } catch (err) {
    res.status(500).send('Error fetching plants.');
  }
};

exports.getPlantById = async (req, res) => {
  try {
    const plant = await PlantModel.getPlantById(req.params.id);
    if (!plant) return res.status(404).send('Plant not found.');
    res.json(plant);
  } catch (err) {
    res.status(500).send('Error fetching plant.');
  }
};

exports.getPlantsByProperty = async (req, res) => {
  try {
    const propertyId = parseInt(req.params.property_id, 10);

    if (isNaN(propertyId)) {
      return res.status(400).json({ error: 'Invalid property_id' });
    }

    const plants = await PlantModel.getPlantsByProperty(propertyId);
    res.json(plants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error getting plant details' });
  }
};

exports.updatePlant = async (req, res) => {
  try {
    const modified_on = new Date();
    const result = await PlantModel.updatePlant(req.params.id, { ...req.body, modified_on });
    if (result.affectedRows === 0) return res.status(404).send('Plant not found.');
    res.send('Plant updated successfully.');
  } catch (err) {
    res.status(500).send('Error updating plant.');
  }
};

exports.deletePlant = async (req, res) => {
  try {
    const result = await PlantModel.deletePlant(req.params.id);
    if (result.affectedRows === 0) return res.status(404).send('Plant not found.');
    res.send('Plant deleted successfully.');
  } catch (err) {
    res.status(500).send('Error deleting plant.');
  }
};
