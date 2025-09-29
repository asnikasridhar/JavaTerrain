const express = require('express');
const router = express.Router();
const plantDetailController = require('../controllers/plantDetailController');

// Add new plant detail
router.post('/add-plantdetail', plantDetailController.addPlantDetail);

// Get all plant details
router.get('/plantdetails', plantDetailController.getAllPlantDetails);

// Get plant detail by ID
router.get('/plantdetails/:id', plantDetailController.getPlantDetailById);

// Get plant details by property_id
router.get('/plantdetails-by-prop/:property_id', plantDetailController.getPlantDetailsByProperty);

// Update plant detail
router.put('/update-plantdetail/:plant_id', plantDetailController.updatePlantDetail);

// Delete plant detail
router.delete('/delete-plantdetail/:plant_id', plantDetailController.deletePlantDetail);

module.exports = router;
