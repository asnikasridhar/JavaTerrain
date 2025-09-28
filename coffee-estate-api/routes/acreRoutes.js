const express = require('express');
const router = express.Router();
const acreController = require('../controllers/acreController');

router.post('/add-acre', acreController.addAcre);
router.get('/acredetails', acreController.getAllAcres);
router.get('/acredetails/:id', acreController.getAcreById);
router.get('/acredetailsbyuserid/:userId', acreController.getAcresByUserId);
router.put('/update-acre/:id', acreController.updateAcre);
router.delete('/delete-acre/:id', acreController.deleteAcre);

module.exports = router;
