const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.post('/', propertyController.createProperty);
router.get('/properties/', propertyController.getAllProperties);
router.get('/properties/:id', propertyController.getPropertyByUserId);
router.put('/edit-property/:id', propertyController.updateProperty);
router.delete('/delete-property/:id', propertyController.deleteProperty);

module.exports = router;
