const express = require('express');
const router = express.Router();
const blockController = require('../controllers/blockController');

router.post('/addblock', blockController.createBlock);
router.get('/', blockController.getAllBlocks);
router.get('/blockdetails/:id', blockController.getBlockById);
router.get('/blocks-by-prop/:propertyId', blockController.getBlocksByPropertyId);
router.put('/updateblock/:id', blockController.updateBlock);
router.delete('/:id', blockController.deleteBlock);

module.exports = router;
