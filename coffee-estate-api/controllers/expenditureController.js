const Expenditure = require('../models/expenditureModel');

// Create Expenditure
exports.addExpenditure = async (req, res) => {
  try {
    const result = await Expenditure.createExpenditure(req.body);
    res.status(201).json({ message: 'Expenditure details added successfully.', result });
  } catch (err) {
    console.error('Error adding expenditure:', err);
    res.status(500).json({ error: 'Failed to add expenditure' });
  }
};

// Get All Expenditures
exports.getExpenditures = async (req, res) => {
  try {
    const results = await Expenditure.getAllExpenditures();
    res.json(results);
  } catch (err) {
    console.error('Error fetching expenditures:', err);
    res.status(500).json({ error: 'Failed to fetch expenditures' });
  }
};

// Get Expenditure by ID
exports.getExpenditureById = async (req, res) => {
  try {
    const result = await Expenditure.getExpenditureById(req.params.id);
    if (!result) return res.status(404).json({ error: 'Expenditure not found' });
    res.json(result);
  } catch (err) {
    console.error('Error fetching expenditure by ID:', err);
    res.status(500).json({ error: 'Failed to fetch expenditure' });
  }
};

// Get Expenditures by PropertyId and Days
exports.getExpendituresByPropertyId = async (req, res) => {
  try {
    const { property_id, days } = req.params;
    const results = await Expenditure.getExpendituresByPropertyId(property_id, parseInt(days, 10));
    res.json(results);
  } catch (err) {
    console.error('Error fetching expenditures by property:', err);
    res.status(500).json({ error: 'Failed to fetch expenditures' });
  }
};

// Update Expenditure
exports.updateExpenditure = async (req, res) => {
  try {
    await Expenditure.updateExpenditure(req.params.expenditure_id, req.body);
    res.json({ message: 'Expenditure updated successfully.' });
  } catch (err) {
    console.error('Error updating expenditure:', err);
    res.status(500).json({ error: 'Failed to update expenditure' });
  }
};

// Delete Expenditure
exports.deleteExpenditure = async (req, res) => {
  try {
    await Expenditure.deleteExpenditure(req.params.expenditure_id);
    res.json({ message: 'Expenditure deleted successfully.' });
  } catch (err) {
    console.error('Error deleting expenditure:', err);
    res.status(500).json({ error: 'Failed to delete expenditure' });
  }
};
