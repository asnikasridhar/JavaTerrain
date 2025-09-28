const express = require('express');
const router = express.Router();
const PlantController = require('../controllers/plantController');

router.post('/add-plant', PlantController.addPlant);
router.get('/plants', PlantController.getAllPlants);
router.get('/plants/:id', PlantController.getPlantById);
router.put('/update-plant/:id', PlantController.updatePlant);
router.delete('/delete-plant/:id', PlantController.deletePlant);

module.exports = router;
