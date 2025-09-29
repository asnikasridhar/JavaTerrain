const express = require('express');
const router = express.Router();
const CropController = require('../controllers/cropController');

router.post('/add-crop', CropController.addCrop);
router.get('/crops', CropController.getAllCrops);
router.get('/crops/:id', CropController.getCropById);
router.get('/cropdetails-by-prop/:propertyId', CropController.getByPropertyId);
router.put('/update-crop/:id', CropController.updateCrop);
router.delete('/delete-crop/:id', CropController.deleteCrop);


module.exports = router;
