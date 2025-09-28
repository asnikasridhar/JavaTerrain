const express = require('express');
const router = express.Router();
const laborController = require('../controllers/laborController');

router.post('/add-labor', laborController.addLabor);
router.get('/labors', laborController.getAllLabors);
router.get('/labor/:id', laborController.getLaborById);
router.get('/labors-prop/:property_id', laborController.getLaborsByPropertyId);
router.put('/labors/:id', laborController.updateLabor);
router.delete('/labors/:id', laborController.deleteLabor);

module.exports = router;
