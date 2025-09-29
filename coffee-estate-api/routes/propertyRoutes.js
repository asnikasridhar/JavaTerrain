const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Routes
router.post('/add-property-for-user', propertyController.addPropertyForUser);
router.post('/add-property', propertyController.addProperty);

router.get('/propertydetails/:id', propertyController.getPropertyById);
router.get('/properties', propertyController.getAllProperties);
router.get('/properties/:user_id', propertyController.getPropertiesByUser);
router.get('/user-properties/:user_id', propertyController.getPropertiesByUser);

router.put('/update-property/:property_id', propertyController.updateProperty);
router.delete('/delete-property/:property_id', propertyController.deleteProperty);

module.exports = router;
