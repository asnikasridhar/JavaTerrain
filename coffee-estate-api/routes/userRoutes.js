const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/add-user', userController.addUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.get('/users-by-property-id/:propertyId', userController.getUsersByPropertyId);
router.put('/users/:id', userController.updateUser);

module.exports = router;
