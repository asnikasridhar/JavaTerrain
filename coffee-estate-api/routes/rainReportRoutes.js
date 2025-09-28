const express = require('express');
const router = express.Router();
const rainReportController = require('../controllers/rainReportController');

router.get('/rain-report', rainReportController.getRainReport);

module.exports = router;
