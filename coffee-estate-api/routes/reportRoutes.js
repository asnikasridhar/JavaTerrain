const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportController');

router.post('/add-report', ReportController.addReport);
router.get('/reports', ReportController.getAllReports);
router.get('/reports/:id', ReportController.getReportById);
router.put('/update-report/:id', ReportController.updateReport);
router.delete('/delete-report/:id', ReportController.deleteReport);

module.exports = router;
