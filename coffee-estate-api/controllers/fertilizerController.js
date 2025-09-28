const Fertilizer = require('../models/fertilizerModel');

exports.addFertilizer = async (req, res) => {
  try {
    const created_on = new Date();
    const result = await Fertilizer.createFertilizer({ ...req.body, created_on });
    res.json({ message: 'Fertilizer added successfully', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error adding fertilizer' });
  }
};

exports.getFertilizers = async (req, res) => {
  try {
    const fertilizers = await Fertilizer.getAllFertilizers();
    res.json(fertilizers);
  } catch {
    res.status(500).json({ error: 'Error fetching fertilizers' });
  }
};

exports.getFertilizer = async (req, res) => {
  try {
    const fertilizer = await Fertilizer.getFertilizerById(req.params.id);
    if (!fertilizer) return res.status(404).json({ error: 'Not found' });
    res.json(fertilizer);
  } catch {
    res.status(500).json({ error: 'Error fetching fertilizer' });
  }
};

exports.getFertilizersByProperty = async (req, res) => {
  try {
    const { property_id, days } = req.params;
    const fertilizers = await Fertilizer.getByPropertyAndDays(property_id, days);
    res.json(fertilizers);
  } catch {
    res.status(500).json({ error: 'Error fetching fertilizers by property' });
  }
};

exports.updateFertilizer = async (req, res) => {
  try {
    const modified_on = new Date();
    const result = await Fertilizer.updateFertilizer(req.params.fertilizer_id, { ...req.body, modified_on });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated successfully' });
  } catch {
    res.status(500).json({ error: 'Error updating fertilizer' });
  }
};

exports.deleteFertilizer = async (req, res) => {
  try {
    const result = await Fertilizer.deleteFertilizer(req.params.fertilizer_id);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Error deleting fertilizer' });
  }
};
