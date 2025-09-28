const ReportModel = require('../models/reportModel');

exports.addReport = async (req, res) => {
  try {
    const created_on = new Date();
    await ReportModel.createReport({ ...req.body, created_on });
    res.send('Report added successfully.');
  } catch (err) {
    res.status(500).send('Error adding report.');
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await ReportModel.getAllReports();
    res.json(reports);
  } catch (err) {
    res.status(500).send('Error fetching reports.');
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await ReportModel.getReportById(req.params.id);
    if (!report) return res.status(404).send('Report not found.');
    res.json(report);
  } catch (err) {
    res.status(500).send('Error fetching report.');
  }
};

exports.updateReport = async (req, res) => {
  try {
    const modified_on = new Date();
    const result = await ReportModel.updateReport(req.params.id, { ...req.body, modified_on });
    if (result.affectedRows === 0) return res.status(404).send('Report not found.');
    res.send('Report updated successfully.');
  } catch (err) {
    res.status(500).send('Error updating report.');
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const result = await ReportModel.deleteReport(req.params.id);
    if (result.affectedRows === 0) return res.status(404).send('Report not found.');
    res.send('Report deleted successfully.');
  } catch (err) {
    res.status(500).send('Error deleting report.');
  }
};
