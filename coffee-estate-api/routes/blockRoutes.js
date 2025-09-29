const express = require('express');
const router = express.Router();
const blockController = require('../controllers/blockController');

// Routes
router.post('/addblock', blockController.addBlock);
router.get('/blockdetails/:id', blockController.getBlockById);
router.get('/blocks-by-prop/:property_id', blockController.getBlocksByPropertyId);
router.put('/updateblock/:block_id', blockController.updateBlock);
router.delete('/deleteblock/:block_id', blockController.deleteBlock);

module.exports = router;
