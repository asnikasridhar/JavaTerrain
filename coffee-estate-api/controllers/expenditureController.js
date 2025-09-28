const ExpModel = require('../models/expenditureModel');

exports.addExpenditure = async (req, res) => {
  try {
    const created_on = new Date();
    await ExpModel.createExpenditure({ ...req.body, created_on });
    res.send('Expenditure added successfully.');
  } catch (err) {
    res.status(500).send('Error adding expenditure.');
  }
};

exports.getAllExpenditures = async (req, res) => {
  try {
    const expenses = await ExpModel.getAllExpenditures();
    res.json(expenses);
  } catch (err) {
    res.status(500).send('Error fetching expenditures.');
  }
};

exports.getExpenditureById = async (req, res) => {
  try {
    const exp = await ExpModel.getExpenditureById(req.params.id);
    if (!exp) return res.status(404).send('Expenditure not found.');
    res.json(exp);
  } catch (err) {
    res.status(500).send('Error fetching expenditure.');
  }
};

exports.updateExpenditure = async (req, res) => {
  try {
    const modified_on = new Date();
    const result = await ExpModel.updateExpenditure(req.params.id, { ...req.body, modified_on });
    if (result.affectedRows === 0) return res.status(404).send('Expenditure not found.');
    res.send('Expenditure updated successfully.');
  } catch (err) {
    res.status(500).send('Error updating expenditure.');
  }
};

exports.deleteExpenditure = async (req, res) => {
  try {
    const result = await ExpModel.deleteExpenditure(req.params.id);
    if (result.affectedRows === 0) return res.status(404).send('Expenditure not found.');
    res.send('Expenditure deleted successfully.');
  } catch (err) {
    res.status(500).send('Error deleting expenditure.');
  }
};
