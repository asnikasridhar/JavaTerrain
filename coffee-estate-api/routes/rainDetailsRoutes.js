const express = require('express');
const router = express.Router();
const rainController = require('../controllers/rainDetailsController');

router.post('/add-rain', rainController.addRainDetail);
router.get('/raindetails', rainController.getAllRainDetails);
router.get('/raindetails-prop/:property_id', rainController.getRainDetailsByProperty);
router.get('/raindetails/:id', rainController.getRainDetailById);
router.put('/update-rain/:id', rainController.updateRainDetail);
router.delete('/delete-rain/:id', rainController.deleteRainDetail);

module.exports = router;
