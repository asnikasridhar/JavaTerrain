const express = require('express');
const router = express.Router();
const blockController = require('../controllers/blockController');

router.post('/', blockController.createBlock);
router.get('/', blockController.getAllBlocks);
router.get('/:id', blockController.getBlockById);
router.get('/property/:propertyId', blockController.getBlocksByPropertyId);
router.put('/:id', blockController.updateBlock);
router.delete('/:id', blockController.deleteBlock);

module.exports = router;
