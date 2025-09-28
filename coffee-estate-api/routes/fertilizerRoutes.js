const express = require('express');
const router = express.Router();
const fertilizerController = require('../controllers/fertilizerController');

router.post('/add-fertilizer', fertilizerController.addFertilizer);
router.get('/fertilizers', fertilizerController.getFertilizers);
router.get('/fertilizer/:id', fertilizerController.getFertilizer);
router.get('/fertilizers-by-prop/:property_id/:days', fertilizerController.getFertilizersByProperty);
router.put('/update-fertilizer/:fertilizer_id', fertilizerController.updateFertilizer);
router.delete('/delete-fertilizer/:fertilizer_id', fertilizerController.deleteFertilizer);

module.exports = router;
