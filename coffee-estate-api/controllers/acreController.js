const Acre = require('../models/acreModel');

exports.addAcre = async (req, res) => {
  const { user_id, acre_size, plant_type, terrain, location, water_availability, property_id, created_by } = req.body;
  const created_on = new Date();

  try {
    await Acre.createAcre({ user_id, acre_size, plant_type, terrain, location, water_availability, property_id, created_on, created_by });
    res.send('Acre added successfully');
  } catch (err) {
    console.error('Error adding acre:', err);
    res.status(500).send('Error adding acre.');
  }
};

exports.getAllAcres = async (req, res) => {
  try {
    const acres = await Acre.getAllAcres();
    res.json(acres);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve acre details' });
  }
};

exports.getAcreById = async (req, res) => {
  try {
    const acre = await Acre.getAcreById(req.params.id);
    if (!acre) return res.status(404).json({ error: 'Acre not found' });
    res.json(acre);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve acre' });
  }
};

exports.getAcresByUserId = async (req, res) => {
  try {
    const acres = await Acre.getAcresByUserId(req.params.userId);
    res.json(acres);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve acres by user' });
  }
};

exports.updateAcre = async (req, res) => {
  const { user_id, acre_size, plant_type, terrain, location, water_availability, property_id, modified_by } = req.body;
  const modified_on = new Date();

  try {
    const result = await Acre.updateAcre(req.params.id, { user_id, acre_size, plant_type, terrain, location, water_availability, property_id, modified_on, modified_by });
    if (result.affectedRows === 0) return res.status(404).send('Acre not found.');
    res.send('Acre updated successfully');
  } catch {
    res.status(500).send('Error updating acre.');
  }
};

exports.deleteAcre = async (req, res) => {
  try {
    const result = await Acre.deleteAcre(req.params.id);
    if (result.affectedRows === 0) return res.status(404).send('Acre not found.');
    res.send('Acre deleted successfully');
  } catch {
    res.status(500).send('Error deleting acre.');
  }
};
