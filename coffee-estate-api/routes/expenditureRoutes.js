const express = require('express');
const router = express.Router();
const expenditureController = require('../controllers/expenditureController');

// Routes
router.post('/add-expenditure', expenditureController.addExpenditure);
router.get('/expendituredetails', expenditureController.getExpenditures);
router.get('/expendituredetails/:id', expenditureController.getExpenditureById);
router.get('/expendituredetails-by-prop/:property_id/:days', expenditureController.getExpendituresByPropertyId);
router.put('/update-expenditure/:expenditure_id', expenditureController.updateExpenditure);
router.delete('/delete-expenditure/:expenditure_id', expenditureController.deleteExpenditure);

module.exports = router;
