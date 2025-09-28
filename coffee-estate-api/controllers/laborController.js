const Labor = require('../models/laborModel');

exports.addLabor = async (req, res) => {
  const { user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, created_by, property_id } = req.body;
  const created_on = new Date();

  try {
    const result = await Labor.createLabor({ user_id, name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, created_on, created_by });
    const labor_id = result.insertId;

    await Labor.linkLaborToProperty(property_id, labor_id);
    res.send('Labor added and linked with property successfully');
  } catch (err) {
    console.error('Error adding labor:', err);
    res.status(500).send('Failed to add labor.');
  }
};

exports.getAllLabors = async (req, res) => {
  try {
    const labors = await Labor.getAllLabors();
    res.json(labors);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve labor details' });
  }
};

exports.getLaborById = async (req, res) => {
  try {
    const labor = await Labor.getLaborById(req.params.id);
    if (!labor) return res.status(404).json({ error: 'Labor not found' });
    res.json(labor);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve labor' });
  }
};

exports.getLaborsByPropertyId = async (req, res) => {
  try {
    const labors = await Labor.getLaborsByPropertyId(req.params.property_id);
    res.json(labors);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve labors by property' });
  }
};

exports.updateLabor = async (req, res) => {
  const { name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, modified_by } = req.body;
  const modified_on = new Date();

  try {
    const result = await Labor.updateLabor(req.params.id, { name, age, adhar_card, bank_details, health_history, photo, address, emergency_details, modified_on, modified_by });
    if (result.affectedRows === 0) return res.status(404).send('Labor not found.');
    res.send('Labor updated successfully');
  } catch {
    res.status(500).send('Error updating labor.');
  }
};

exports.deleteLabor = async (req, res) => {
  try {
    const result = await Labor.deleteLabor(req.params.id);
    if (result.affectedRows === 0) return res.status(404).send('Labor not found.');
    res.send('Labor deleted successfully');
  } catch {
    res.status(500).send('Error deleting labor.');
  }
};
