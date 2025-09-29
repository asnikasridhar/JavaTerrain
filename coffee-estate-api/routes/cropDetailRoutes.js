const express = require('express');
const router = express.Router();
const cropDetailController = require('../controllers/cropDetailController');

// Routes
router.post('/add-cropdetail', cropDetailController.addCropDetail);
router.get('/cropdetails', cropDetailController.getCropDetails);
router.get('/cropdetails/:id', cropDetailController.getCropDetailById);
router.get('/cropdetails-by-prop/:id', cropDetailController.getCropDetailsByPropertyId);
router.put('/update-cropdetail/:crop_id', cropDetailController.updateCropDetail);
router.delete('/delete-cropdetail/:crop_id', cropDetailController.deleteCropDetail);

module.exports = router;
