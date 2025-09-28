const express = require('express');
const router = express.Router();
const ExpController = require('../controllers/expenditureController');

router.post('/add-expenditure', ExpController.addExpenditure);
router.get('/expenditures', ExpController.getAllExpenditures);
router.get('/expenditures/:id', ExpController.getExpenditureById);
router.put('/update-expenditure/:id', ExpController.updateExpenditure);
router.delete('/delete-expenditure/:id', ExpController.deleteExpenditure);

module.exports = router;
